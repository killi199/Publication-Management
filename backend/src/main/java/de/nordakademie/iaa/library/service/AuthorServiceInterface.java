package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.AuthorDto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * The author service provides methods to handle the authors
 */
public interface AuthorServiceInterface {

    /**
     * get all authors
     *
     * @return all authors
     */
    List<AuthorDto> getAll();

    /**
     * create a author
     *
     * @param authorDto the author that should be created
     * @return the created author
     */
    AuthorDto create(AuthorDto authorDto);

    /**
     * update a author
     *
     * @param authorDto the author that should be updated
     * @return the updated author
     */
    AuthorDto update(AuthorDto authorDto);


    /**
     * deletes the author
     *
     * @param uuid the author that should be deleted
     */
    void delete(@NotNull UUID uuid);
}
