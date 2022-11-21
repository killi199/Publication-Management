package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.AuthorsPublications;
import de.nordakademie.iaa.library.persistent.entities.compositeKeys.AuthorPublicationsKey;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuthorsPublicationsRepository
        extends CustomBaseRepository<AuthorsPublications, AuthorPublicationsKey> {

    /**
     * find all author publications
     *
     * @return List of AuthorPublications
     */
    @Query("SELECT DISTINCT ap " +
            "FROM AuthorsPublications ap " +
            "LEFT OUTER JOIN FETCH ap.publication p " +
            "LEFT OUTER JOIN FETCH ap.author a ")
    List<AuthorsPublications> findAll();

    /**
     * Deletes all relations that does not exist anymore
     */
    @Modifying
    @Query("DELETE FROM AuthorsPublications ap " +
            "WHERE ap.publication.key = :publicationKey " +
            "AND NOT ap.author.uuid IN :authorUuids")
    void deleteAllRemovedRelations(@Param("publicationKey") String key, @Param("authorUuids") List<UUID> authorUuids);
}
