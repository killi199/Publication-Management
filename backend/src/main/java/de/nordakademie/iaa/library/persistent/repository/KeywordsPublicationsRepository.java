package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.KeywordsPublications;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KeywordsPublicationsRepository extends CustomBaseRepository<KeywordsPublications, UUID> {

    /**
     * find all keyword publications
     *
     * @return List of KeywordsPublications
     */
    @Query("SELECT DISTINCT ap " +
            "FROM KeywordsPublications ap " +
            "LEFT OUTER JOIN FETCH ap.publication p " +
            "LEFT OUTER JOIN FETCH ap.keyword a ")
    List<KeywordsPublications> findAll();
}
