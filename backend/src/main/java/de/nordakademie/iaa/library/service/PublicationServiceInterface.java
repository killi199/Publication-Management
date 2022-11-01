package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.PublicationDto;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The publication service provides methods to handle the publications
 */
public interface PublicationServiceInterface {

    /**
     * get all publications
     *
     * @return all publications
     */
    List<PublicationDto> getAll();

    /**
     * create a publication
     *
     * @param publicationDto the publication that should be created
     * @return the created publication
     */
    PublicationDto create(PublicationDto publicationDto);

    /**
     * update a publication
     *
     * @param publicationDto the publication that should be updated
     * @return the updated publication
     */
    PublicationDto update(PublicationDto publicationDto);


    /**
     * deletes the publication
     *
     * @param key the publication that should be deleted
     */
    void delete(@NotNull String key);
}
