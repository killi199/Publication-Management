package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.AuthorsPublications;
import de.nordakademie.iaa.library.persistent.entities.KeywordsPublications;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import de.nordakademie.iaa.library.persistent.repository.AuthorsPublicationsRepository;
import de.nordakademie.iaa.library.persistent.repository.KeywordsPublicationsRepository;
import de.nordakademie.iaa.library.persistent.repository.PublicationRepository;
import de.nordakademie.iaa.library.service.PublicationServiceInterface;
import de.nordakademie.iaa.library.service.mapper.PublicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static de.nordakademie.iaa.library.service.helper.InputValidator.isStringEmpty;

/**
 * The Publication service provides methods to handle the Publications
 */
@Service
@Transactional
public class PublicationService implements PublicationServiceInterface {

    private final PublicationRepository publicationRepository;

    private final PublicationMapper publicationMapper;

    private final AuthorsPublicationsRepository authorsPublicationsRepository;

    private final KeywordsPublicationsRepository keywordsPublicationsRepository;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository,
                              PublicationMapper publicationMapper,
                              AuthorsPublicationsRepository authorsPublicationsRepository,
                              KeywordsPublicationsRepository keywordsPublicationsRepository) {
        this.publicationRepository = publicationRepository;
        this.publicationMapper = publicationMapper;
        this.authorsPublicationsRepository = authorsPublicationsRepository;
        this.keywordsPublicationsRepository = keywordsPublicationsRepository;
    }

    /**
     * get all Publications
     *
     * @return all Publications
     */
    public List<PublicationDto> getAll(boolean showDeleted) {
        List<Publication> publications = publicationRepository.findAllOrderedByTitle(showDeleted);


        return publicationMapper.publicationEntitiesToDtos(loadAuthorsAndKeywords(publications));
    }

    /**
     * returns all Publications by a list of keys
     *
     * @param keys list of keys that should be loaded
     * @return list of publications
     */
    public List<Publication> getAllByKeys(List<String> keys) {
        List<Publication> publications = publicationRepository.findAllByKeys(keys);


        return loadAuthorsAndKeywords(publications);
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
     * this loads the authors and keywords to lower the number of sql queries.
     * It would be possible to load authors or keywords together with the publications but both
     * is caused by the cartesian and the hibernate bagFetchException not possible so that we
     * decided to load both manually for consistency
     *
     * @param publications
     * @return
     */
    private List<Publication> loadAuthorsAndKeywords(List<Publication> publications) {
        List<AuthorsPublications> authorsPublications = authorsPublicationsRepository.findAll();
        List<KeywordsPublications> keywordsPublications = keywordsPublicationsRepository.findAll();


        for (Publication publication : publications) {
            List<AuthorsPublications> authorsPublicationsOfPublication = authorsPublications.stream()
                    .filter(ap -> ap.getPublication().getKey().equals(publication.getKey()))
                    .collect(Collectors.toList());

            List<KeywordsPublications> keywordsPublicationsOfPublication = keywordsPublications.stream()
                    .filter(ap -> ap.getPublication().getKey().equals(publication.getKey()))
                    .collect(Collectors.toList());

            publication.setAuthorsPublications(authorsPublicationsOfPublication);
            publication.setKeywordsPublications(keywordsPublicationsOfPublication);
        }

        return publications;
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
     *            \@NotNull is here for documentation and does nothing.
     *            This method should not be called with null values.
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

        return publicationMapper.publicationEntityToDto(publicationRepository.saveAndRefresh(publication));
    }
}
