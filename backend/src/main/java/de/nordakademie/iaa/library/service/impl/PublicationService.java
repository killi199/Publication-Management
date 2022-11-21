package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.PublicationRepository;
import de.nordakademie.iaa.library.service.PublicationServiceInterface;
import de.nordakademie.iaa.library.service.mapper.PublicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

/**
 * The Publication service provides methods to handle the Publications
 */
@Service
@Transactional
public class PublicationService implements PublicationServiceInterface {

    private final PublicationRepository publicationRepository;

    private final PublicationMapper publicationMapper;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository,
                              PublicationMapper publicationMapper) {
        this.publicationRepository = publicationRepository;
        this.publicationMapper = publicationMapper;
    }

    /**
     * get all Publications
     *
     * @return all Publications
     */
    public List<PublicationDto> getAll(boolean showDeleted) {
        List<Publication> publications = publicationRepository.findAllOrderedByTitle(showDeleted);

        return publicationMapper.publicationEntitiesToDtos(publications);
    }

    /**
     * returns all Publications by a list of keys
     *
     * @param keys list of keys that should be loaded
     * @return list of publications
     */
    public List<PublicationDto> getAllByKeys(List<String> keys) {
        List<Publication> publications = publicationRepository.findAllByKeys(keys);


        return publicationMapper.publicationEntitiesToDtos(publications);
    }

    /**
     * Lowers the quantity of the publication
     *
     * @param key publication key
     */
    public void reduceQuantityOnce(String key) {
        publicationRepository.reduceQuantityOnce(key);
    }

    /**
     * get a Publication by its key
     *
     * @param key key of publication
     * @return publication if found
     * @throws EntityDoesNotExistException when not found
     */
    public PublicationDto getByKey(String key) {
        Optional<Publication> publicationOptional = publicationRepository.findById(key);

        if (publicationOptional.isEmpty()) {
            throw new EntityDoesNotExistException();
        }

        return publicationMapper.publicationEntityToDto(publicationOptional.get());
    }


    /**
     * deletes the Publication
     *
     * @param key the Publication that should be deleted
     *            \@NotNull is here for documentation and does nothing.
     *            This method should not be called with null values.
     */
    public void delete(@NotNull String key) {
        Publication publication = new Publication();
        publication.setKey(key);
        publicationRepository.delete(publication);
    }

    /**
     * create or updates a Publication
     *
     * @param publicationDto the Publication that should be created or updated
     * @return the created or updated Publication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public PublicationDto createOrUpdate(@NotNull PublicationDto publicationDto) {
        Publication publication = publicationMapper.publicationDtoToEntity(publicationDto);

        return publicationMapper.publicationEntityToDto(publicationRepository.saveAndRefresh(publication));
    }
}
