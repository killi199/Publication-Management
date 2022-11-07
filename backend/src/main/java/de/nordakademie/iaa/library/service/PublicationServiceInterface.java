package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.PublicationDto;

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
    List<PublicationDto> getAll();

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
}
