package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.api.exception.NegativValueIsNotAllowedException;
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

import static de.nordakademie.iaa.library.service.helper.InputValidator.isStringEmpty;

/**
 * The Publication service provides methods to handle the Publications
 */
@Service
@Transactional
public class PublicationService implements PublicationServiceInterface {

    private final PublicationRepository publicationRepository;

    private final PublicationMapper publicationMapper;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository, PublicationMapper publicationMapper) {
        this.publicationRepository = publicationRepository;
        this.publicationMapper = publicationMapper;
    }

    /**
     * get all Publications
     *
     * @return all Publications
     */
    public List<PublicationDto> getAll() {
        List<Publication> publications = publicationRepository.findAll();
        return publicationMapper.publicationEntitiesToDtos(publications);
    }

    /**
     * get a Publication by its key
     *
     * @param key key of publication
     * @return publication if found
     * @throws EntityDoesNotExistException when not found
     */
    public Publication getByKey(String key) {
        Optional<Publication> publicationOptional = publicationRepository.findById(key);

        if (publicationOptional.isEmpty()) {
            throw new EntityDoesNotExistException();
        }

        return publicationOptional.get();
    }

    /**
     * create a Publication
     *
     * @param publicationDto the Publication that should be created
     * @return the created Publication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public PublicationDto create(@NotNull PublicationDto publicationDto) {

        checkRequiredFields(publicationDto);

        if (publicationRepository.existsById(publicationDto.getKey())) {
            throw new EntityAlreadyExistsException();
        }

        return createOrUpdate(publicationDto);
    }

    /**
     * update a Publication
     *
     * @param publicationDto the Publication that should be updated
     * @return the updated Publication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public PublicationDto update(@NotNull PublicationDto publicationDto) {

        checkRequiredFields(publicationDto);

        if (!publicationRepository.existsById(publicationDto.getKey())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(publicationDto);
    }


    /**
     * deletes the Publication
     *
     * @param key the Publication that should be deleted
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public void delete(@NotNull String key) {
        Publication publication = new Publication();
        publication.setKey(key);
        publicationRepository.delete(publication);
    }

    /**
     * This function checks if every required parameter is set
     *
     * @param publicationDto dto from request
     */
    private void checkRequiredFields(@NotNull PublicationDto publicationDto) {
        if (isStringEmpty(publicationDto.getKey())) {
            throw new MissingFieldException("key");
        }

        if (isStringEmpty(publicationDto.getTitle())) {
            throw new MissingFieldException("title");
        }

        if (publicationDto.getQuantity() < 0) {
            throw new NegativValueIsNotAllowedException("quantity");
        }
    }

    /**
     * create or updates a Publication
     *
     * @param publicationDto the Publication that should be created or updated
     * @return the created or updated Publication
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private PublicationDto createOrUpdate(@NotNull PublicationDto publicationDto) {
        Publication publication = publicationMapper.publicationDtoToEntity(publicationDto);

        return publicationMapper.publicationEntityToDto(publicationRepository.save(publication));
    }
}
