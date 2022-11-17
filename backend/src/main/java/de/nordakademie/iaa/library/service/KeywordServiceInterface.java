package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.KeywordDto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * The keyword service provides methods to handle the keywords
 */
public interface KeywordServiceInterface {

    /**
     * get all keywords
     *
     * @return all keywords
     */
    List<KeywordDto> getAll();

    /**
     * create a keyword
     *
     * @param keywordDto the keyword that should be created
     * @return the created keyword
     */
    KeywordDto create(KeywordDto keywordDto);

    /**
     * update a keyword
     *
     * @param keywordDto the keyword that should be updated
     * @return the updated keyword
     */
    KeywordDto update(KeywordDto keywordDto);


    /**
     * deletes the keyword
     *
     * @param uuid the keyword that should be deleted
     */
    void delete(@NotNull UUID uuid);
}
