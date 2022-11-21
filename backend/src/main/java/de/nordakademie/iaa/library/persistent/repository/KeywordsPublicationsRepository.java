package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.KeywordsPublications;
import de.nordakademie.iaa.library.persistent.entities.compositeKeys.KeywordPublicationsKey;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KeywordsPublicationsRepository extends CustomBaseRepository<KeywordsPublications, KeywordPublicationsKey> {

    /**
     * find all keyword publications
     *
     * @return List of KeywordsPublications
     */
    @Query("SELECT DISTINCT kp " +
            "FROM KeywordsPublications kp " +
            "LEFT OUTER JOIN FETCH kp.publication p " +
            "LEFT OUTER JOIN FETCH kp.keyword a ")
    List<KeywordsPublications> findAll();

    /**
     * Deletes all relations that does not exist anymore
     */
    @Modifying
    @Query("DELETE FROM KeywordsPublications kp " +
            "WHERE kp.publication.key = :publicationKey " +
            "AND NOT kp.keyword.uuid IN :keywordUuids")
    void deleteAllRemovedRelations(@Param("publicationKey") String key, @Param("keywordUuids") List<UUID> keywordUuids);
}
