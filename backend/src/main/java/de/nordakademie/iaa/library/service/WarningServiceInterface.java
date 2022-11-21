package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.WarningDto;

import java.util.UUID;

/**
 * The warning service provides methods to handle the warnings
 */
public interface WarningServiceInterface {


    /**
     * create warning
     *
     * @param overdueNoticeUuid the overdue notice identifier
     * @return the created warning
     */
    WarningDto create(UUID overdueNoticeUuid);


    /**
     * Counts the number of warnings.
     *
     * @param overdueNoticeUuid the overdue notice identifier
     */
    int countAllByOverdueNoticeUuid(UUID overdueNoticeUuid);
}