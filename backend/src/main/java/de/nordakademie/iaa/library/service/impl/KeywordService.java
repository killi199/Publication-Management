package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityAlreadyExistsException;
import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.dto.KeywordDto;
import de.nordakademie.iaa.library.persistent.entities.Keyword;
import de.nordakademie.iaa.library.persistent.repository.KeywordRepository;
import de.nordakademie.iaa.library.service.KeywordServiceInterface;
import de.nordakademie.iaa.library.service.mapper.KeywordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * Author: Thorge Früchtenicht
 * The keyword service provides methods to handle the keywords
 */
@Service
@Transactional
public class KeywordService implements KeywordServiceInterface {


    private final KeywordRepository keywordRepository;

    private final KeywordMapper keywordMapper;

    @Autowired
    public KeywordService(KeywordRepository keywordRepository, KeywordMapper keywordMapper) {
        this.keywordRepository = keywordRepository;
        this.keywordMapper = keywordMapper;
    }

    /**
     * get all keywords
     *
     * @return all keywords
     */
    public List<KeywordDto> getAll() {
        List<Keyword> keywords = keywordRepository.findAllByOrderByValue();
        return keywordMapper.keywordEntitiesToDtos(keywords);
    }

    /**
     * create a keyword
     *
     * @param keywordDto the keyword that should be created
     * @return the created keyword
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public KeywordDto create(@NotNull KeywordDto keywordDto) {

        if (keywordDto.getUuid() != null) {
            throw new IllegalUsageOfIdentifierException();
        }

        return createOrUpdate(keywordDto);
    }

    /**
     * update a keyword
     *
     * @param keywordDto the keyword that should be updated
     * @return the updated keyword
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public KeywordDto update(@NotNull KeywordDto keywordDto) {

        if (keywordDto.getUuid() == null || !keywordRepository.existsById(keywordDto.getUuid())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(keywordDto);
    }


    /**
     * deletes the keyword
     *
     * @param uuid the keyword that should be deleted
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public void delete(@NotNull UUID uuid) {
        Keyword keyword = new Keyword();
        keyword.setUuid(uuid);
        keywordRepository.delete(keyword);
    }

    /**
     * create or update a keyword
     *
     * @param keywordDto the keyword that should be created or updated
     * @return the created or updated keyword
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private KeywordDto createOrUpdate(@NotNull KeywordDto keywordDto) {
        if (!keywordRepository.findByValue(keywordDto.getValue()).isEmpty()) {
            throw new EntityAlreadyExistsException();
        }

        Keyword keyword = keywordMapper.keywordDtoToEntity(keywordDto);

        return keywordMapper.keywordEntityToDto(keywordRepository.save(keyword));
    }
}
