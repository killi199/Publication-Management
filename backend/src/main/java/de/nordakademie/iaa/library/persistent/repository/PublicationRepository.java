package de.nordakademie.iaa.library.persistent.repository;

import de.nordakademie.iaa.library.persistent.entities.Publication;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends CrudRepository<Publication, String> {
    @Override
    List<Publication> findAll();
}
