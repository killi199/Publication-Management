package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.KindOfPublicationDto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * The kindOfPublication service provides methods to handle the kindOfPublications
 */
public interface KindOfPublicationServiceInterface {

    /**
     * get all kindOfPublications
     *
     * @return all kindOfPublications
     */
    List<KindOfPublicationDto> getAll();

    /**
     * create a kindOfPublication
     *
     * @param keywordDto the kindOfPublication that should be created
     * @return the created kindOfPublication
     */
    KindOfPublicationDto create(KindOfPublicationDto keywordDto);

    /**
     * update a kindOfPublication
     *
     * @param keywordDto the kindOfPublication that should be updated
     * @return the updated kindOfPublication
     */
    KindOfPublicationDto update(KindOfPublicationDto keywordDto);


    /**
     * deletes the kindOfPublication
     *
     * @param uuid the kindOfPublication that should be deleted
     */
    void delete(@NotNull UUID uuid);
}
