package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.AuthorsPublications;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuthorsPublicationsRepository extends CustomBaseRepository<AuthorsPublications, UUID> {

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
}
