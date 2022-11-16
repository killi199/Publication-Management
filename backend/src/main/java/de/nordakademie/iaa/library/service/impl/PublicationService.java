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
        if (publicationDto.getKey() == null) {
            throw new MissingFieldException("key");
        }

        if (publicationDto.getTitle() == null) {
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
