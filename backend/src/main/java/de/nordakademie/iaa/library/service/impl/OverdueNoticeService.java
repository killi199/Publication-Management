package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;
import de.nordakademie.iaa.library.persistent.entities.Assignment;
import de.nordakademie.iaa.library.persistent.entities.OverdueNotice;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.OverdueNoticeRepository;
import de.nordakademie.iaa.library.service.OverdueNoticeServiceInterface;
import de.nordakademie.iaa.library.service.mapper.OverdueNoticeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * The OverdueNotice service provides methods to handle the OverdueNotices
 */
@Service
@Transactional
public class OverdueNoticeService implements OverdueNoticeServiceInterface {

    private final OverdueNoticeRepository overdueNoticeRepository;

    private final OverdueNoticeMapper overdueNoticeMapper;

    private final PublicationService publicationService;

    @Autowired
    public OverdueNoticeService(OverdueNoticeRepository overdueNoticeRepository,
                                OverdueNoticeMapper overdueNoticeMapper,
                                PublicationService publicationService) {
        this.overdueNoticeRepository = overdueNoticeRepository;
        this.overdueNoticeMapper = overdueNoticeMapper;
        this.publicationService = publicationService;
    }

    /**
     * get all OverdueNotices
     *
     * @return all OverdueNotices
     */
    public List<OverdueNoticeDto> getAll(boolean showClosed) {
        List<OverdueNotice> overdueNotices = overdueNoticeRepository.findAllOpenOverdueNotices(new Date(), showClosed);
        return overdueNoticeMapper.overdueNoticeEntitiesToDtos(loadPublications(overdueNotices));
    }

    /**
     * Preload the Publications in the assignments of the overdue notices to lower
     * the total number of requests performed.
     *
     * @param overdueNotices the overdueNotices that should be loaded
     * @return List of overdueNotices
     */
    private List<OverdueNotice> loadPublications(List<OverdueNotice> overdueNotices) {
        List<Publication> publications = publicationService.getAllByKeys(
                overdueNotices
                        .stream()
                        .map(overdueNotice -> overdueNotice
                                .getAssignment()
                                .getPublication()
                                .getKey())
                        .collect(Collectors.toList()));

        Map<String, Publication> publicationMap =
                publications
                        .stream()
                        .collect(Collectors.toMap(Publication::getKey, Function.identity()));

        for (OverdueNotice overdueNotice: overdueNotices) {
            overdueNotice.getAssignment().setPublication(
                    publicationMap.get(overdueNotice.getAssignment().getPublication().getKey()));
        }

        return overdueNotices;
    }

    /**
     *  Checks if an overdue notice is open
     *
     * @param uuid the uuid for the overdue notice
     */
    public boolean isOpen(UUID uuid) {
        return overdueNoticeRepository.isOverdueNoticeOpen(uuid, new Date());
    }

    /**
     * This method deletes all overdue notices that are not opened yet and
     * closes all opened ones.
     *
     * @param assignment the assignment the overdue notices should be updated for.
     */
    public void closeAllOverdueNotices(Assignment assignment) {
        Date closedDate = assignment.getDateOfReturn() == null ? new Date(): assignment.getDateOfReturn();
        overdueNoticeRepository.deleteReservedOverdueNotices(assignment.getUuid(), closedDate);
        overdueNoticeRepository.closeAllOverdueNotices(assignment.getUuid(), closedDate);
    }

    /**
     *
     * Creates an overdue notice for an assignment.
     *
     * @param assignment the assignment an overdue notice should be created for.
     */
    public void createOverdueNotice(Assignment assignment) {
        OverdueNotice overdueNotice = new OverdueNotice();
        overdueNotice.setAssignment(assignment);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(assignment.getLatestReturnDate());
        calendar.add(Calendar.DAY_OF_YEAR, 1);

        overdueNotice.setOpenedAt(calendar.getTime());

        overdueNoticeRepository.save(overdueNotice);
    }

    /**
     * deletes the OverdueNotice
     *
     * @param uuid the OverdueNotice that should be deleted
     *            \@NotNull is here for documentation and does nothing.
     *            This method should not be called with null values.
     */
    public void delete(@NotNull UUID uuid) {

        OverdueNotice overdueNotice = new OverdueNotice();
        overdueNotice.setUuid(uuid);
        overdueNoticeRepository.delete(overdueNotice);
    }
}
