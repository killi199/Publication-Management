package de.nordakademie.iaa.library.persistent.repository;


import de.nordakademie.iaa.library.persistent.entities.Warning;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Handles warning persistent
 */
@Repository
public interface WarningRepository extends CustomBaseRepository<Warning, UUID> {

    /**
     * counts all warnings based on the overdue notice
     * @param uuid overdue notice uuid
     */
    int countAllByOverdueNoticeUuid(UUID uuid);
}
