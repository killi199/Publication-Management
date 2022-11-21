package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Publication;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The Publication service provides methods to handle the Publications
 */
public interface PublicationServiceInterface {

    /**
     * get all Publications
     *
     * @return all Publications
     */
    List<PublicationDto> getAll(boolean showDeleted);

    /**
     * returns all Publications by a list of keys
     *
     * @param keys list of keys that should be loaded
     * @return list of publications
     */
    List<Publication> getAllByKeys(List<String> keys);

    /**
     * get a Publication by its key
     *
     * @param key key of publication
     * @return publication if found
     * @throws EntityDoesNotExistException when not found
     */
    PublicationDto getByKey(String key);

    /**
     * create a Publication
     *
     * @param publicationDto the Publication that should be created
     * @return the created Publication
     */
    PublicationDto create(PublicationDto publicationDto);

    /**
     * update a Publication
     *
     * @param publicationDto the Publication that should be updated
     * @return the updated Publication
     */
    PublicationDto update(PublicationDto publicationDto);


    /**
     * deletes the Publication
     *
     * @param key the Publication that should be deleted
     */
    void delete(@NotNull String key);

    /**
     * Lowers the quantity of the publication
     *
     * @param key publication key
     */
    void reduceQuantityOnce(String key);
}
