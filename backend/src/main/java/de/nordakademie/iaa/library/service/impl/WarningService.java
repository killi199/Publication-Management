package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.MaximumWarningException;
import de.nordakademie.iaa.library.controller.api.exception.OverdueNoticeIsClosedException;
import de.nordakademie.iaa.library.controller.dto.WarningDto;
import de.nordakademie.iaa.library.persistent.entities.OverdueNotice;
import de.nordakademie.iaa.library.persistent.entities.Warning;
import de.nordakademie.iaa.library.persistent.repository.WarningRepository;
import de.nordakademie.iaa.library.service.OverdueNoticeServiceInterface;
import de.nordakademie.iaa.library.service.WarningServiceInterface;
import de.nordakademie.iaa.library.service.mapper.WarningMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * </p>
 * handles warnings
 */
@Service
public class WarningService implements WarningServiceInterface {

    WarningRepository warningRepository;

    WarningMapper warningMapper;

    OverdueNoticeServiceInterface overdueNoticeService;

    @Value("${warning.maxNumber:3}")
    int maxNumberWarnings;

    @Autowired
    public WarningService(WarningRepository warningRepository,
                          WarningMapper warningMapper,
                          OverdueNoticeServiceInterface overdueNoticeService) {
        this.warningRepository = warningRepository;
        this.warningMapper = warningMapper;
        this.overdueNoticeService = overdueNoticeService;
    }

    /**
     * Creates a warning if the overdue notice is open and the maximum number of warnings is not reached.
     *
     * @param overdueNoticeUuid the overdue notice identifier
     * @return the created warning
     */
    @Override
    public WarningDto create(UUID overdueNoticeUuid) {

        if (!overdueNoticeService.isOpen(overdueNoticeUuid)) {
            throw new OverdueNoticeIsClosedException();
        }

        if (countAllByOverdueNoticeUuid(overdueNoticeUuid) >= maxNumberWarnings) {
            throw new MaximumWarningException();
        }

        Warning warning = new Warning();

        OverdueNotice overdueNotice = new OverdueNotice();
        overdueNotice.setUuid(overdueNoticeUuid);

        warning.setOverdueNotice(overdueNotice);
        warning.setWarningDate(new Date());

        return warningMapper.warningEntityToDto(warningRepository.saveAndRefresh(warning));
    }

    /**
     * Counts the number of warnings.
     *
     * @param overdueNoticeUuid the overdue notice identifier
     */
    @Override
    public int countAllByOverdueNoticeUuid(UUID overdueNoticeUuid) {
        return warningRepository.countAllByOverdueNoticeUuid(overdueNoticeUuid);
    }

    /**
     * Counts the number of warnings.
     *
     * @param assignmentUuid the overdue notice identifier
     */
    @Override
    public int countAllByAssignmentUuid(UUID assignmentUuid) {
        return warningRepository.countAllByAssignmentUuid(assignmentUuid);
    }
}
