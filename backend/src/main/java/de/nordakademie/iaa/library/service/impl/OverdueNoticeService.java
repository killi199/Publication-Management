package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;
import de.nordakademie.iaa.library.persistent.entities.OverdueNotice;
import de.nordakademie.iaa.library.persistent.repository.OverdueNoticeRepository;
import de.nordakademie.iaa.library.service.OverdueNoticeServiceInterface;
import de.nordakademie.iaa.library.service.mapper.OverdueNoticeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * The OverdueNotice service provides methods to handle the OverdueNotices
 */
@Service
@Transactional
public class OverdueNoticeService implements OverdueNoticeServiceInterface {

    private final OverdueNoticeRepository overdueNoticeRepository;

    private final OverdueNoticeMapper overdueNoticeMapper;

    @Autowired
    public OverdueNoticeService(OverdueNoticeRepository overdueNoticeRepository, OverdueNoticeMapper overdueNoticeMapper) {
        this.overdueNoticeRepository = overdueNoticeRepository;
        this.overdueNoticeMapper = overdueNoticeMapper;
    }

    /**
     * get all OverdueNotices
     *
     * @return all OverdueNotices
     */
    public List<OverdueNoticeDto> getAll() {
        List<OverdueNotice> overdueNotices = overdueNoticeRepository.findAll();
        return overdueNoticeMapper.overdueNoticeEntitiesToDtos(overdueNotices);
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
