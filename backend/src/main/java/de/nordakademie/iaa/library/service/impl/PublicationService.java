package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
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
 * The publication service provides methods to handle the publications
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
     * get all publications
     *
     * @return all publications
     */
    public List<PublicationDto> getAll() {
        List<Publication> publications = publicationRepository.findAll();
        return publicationMapper.publicationEntitiesToDtos(publications);
    }

    /**
     * create a publication
     *
     * @param publicationDto the publication that should be created
     * @return the created publication
     */
    public PublicationDto create(PublicationDto publicationDto) {

        if (publicationDto.getKey() == null) {
            throw new MissingFieldException("key");
        }

        if (publicationRepository.existsById(publicationDto.getKey())) {
            throw new EntityAlreadyExistsException();
        }

        return createOrUpdate(publicationDto);
    }

    /**
     * update a publication
     *
     * @param publicationDto the publication that should be updated
     * @return the updated publication
     */
    public PublicationDto update(PublicationDto publicationDto) {

        if (publicationDto.getKey() == null) {
            throw new MissingFieldException("key");
        }

        if (!publicationRepository.existsById(publicationDto.getKey())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(publicationDto);
    }


    /**
     * deletes the publication
     *
     * @param key the publication that should be deleted
     */
    public void delete(@NotNull String key) {

        if (key == null) {
            throw new MissingFieldException("key");
        }

        Publication publication = new Publication();
        publication.setKey(key);

        publicationRepository.delete(publication);
    }

    /**
     * create or updates a publication
     *
     * @param publicationDto the publication that should be created or updated
     * @return the created or updated publication
     */
    private PublicationDto createOrUpdate(PublicationDto publicationDto) {
        Publication publication = publicationMapper.publicationDtoToEntity(publicationDto);

        return publicationMapper.publicationEntityToDto(publicationRepository.save(publication));
    }
}
