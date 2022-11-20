package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;

import java.util.List;

/**
 * The OverdueNotice service provides methods to handle the OverdueNotice
 */
public interface OverdueNoticeServiceInterface {

    /**
     * get all OverdueNotices
     *
     * @return all OverdueNotices
     */
    List<OverdueNoticeDto> getAll(boolean showClosed);
}
