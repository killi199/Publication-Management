package de.nordakademie.iaa.library.persistent.repository;


import de.nordakademie.iaa.library.persistent.entities.Warning;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    /**
     * counts all warnings based on the assignment
     * @param uuid assignment uuid
     */
    @Query("SELECT COUNT(w) FROM Warning w WHERE w.overdueNotice.assignment.uuid = :uuid")
    int countAllByAssignmentUuid(@Param("uuid") UUID uuid);
}
