package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * The OverdueNotice service provides methods to handle the OverdueNotice
 */
public interface OverdueNoticeServiceInterface {

    /**
     * get all OverdueNotices
     *
     * @return all OverdueNotices
     */
    List<OverdueNoticeDto> getAll();

    /**
     * deletes the OverdueNotice
     *
     * @param uuid the OverdueNotice that should be deleted
     */
    void delete(@NotNull UUID uuid);
}
