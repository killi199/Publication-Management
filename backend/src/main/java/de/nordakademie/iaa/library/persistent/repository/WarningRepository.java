package de.nordakademie.iaa.library.persistent.repository;


import de.nordakademie.iaa.library.persistent.entities.Warning;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Handles warning persistent
 */
@Repository
public interface WarningRepository extends CustomBaseRepository<Warning, UUID> {


    int countAllByOverdueNoticeUuid(UUID uuid);
}
