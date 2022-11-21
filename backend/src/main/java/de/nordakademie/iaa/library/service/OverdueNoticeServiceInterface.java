package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.OverdueNoticeDto;
import de.nordakademie.iaa.library.persistent.entities.Assignment;

import java.util.List;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * The OverdueNotice service provides methods to handle the OverdueNotice
 */
public interface OverdueNoticeServiceInterface {

    /**
     * get all OverdueNotices
     *
     * @return all OverdueNotices
     */
    List<OverdueNoticeDto> getAll(boolean showClosed);

    /**
     *  Checks if an overdue notice is open
     *
     * @param uuid the uuid of the overdue notice
     */
    boolean isOpen(UUID uuid);

    /**
     * This method deletes all overdue notices that have not been opened yet and
     * closes all opened ones.
     *
     * @param assignment the assignment the overdue notices should be updated for.
     */
    void closeAllOverdueNotices(Assignment assignment);

    /**
     *
     * Creates an overdue notice for an assignment.
     *
     * @param assignment the assignment an overdue notice should be created for.
     */
    void createOverdueNotice(Assignment assignment);
}
