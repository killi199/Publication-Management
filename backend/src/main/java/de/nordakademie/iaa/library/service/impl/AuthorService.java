package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.AuthorDto;
import de.nordakademie.iaa.library.persistent.entities.Author;
import de.nordakademie.iaa.library.persistent.repository.AuthorRepository;
import de.nordakademie.iaa.library.service.AuthorServiceInterface;
import de.nordakademie.iaa.library.service.mapper.AuthorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.service.helper.InputValidator.isStringEmpty;

/**
 * The author service provides methods to handle the authors
 */
@Service
@Transactional
public class AuthorService implements AuthorServiceInterface {


    private final AuthorRepository authorRepository;

    private final AuthorMapper authorMapper;

    @Autowired
    public AuthorService(AuthorRepository authorRepository, AuthorMapper authorMapper) {
        this.authorRepository = authorRepository;
        this.authorMapper = authorMapper;
    }

    /**
     * get all authors
     *
     * @return all authors
     */
    public List<AuthorDto> getAll() {
        List<Author> authors = authorRepository.findAll();
        return authorMapper.authorEntitiesToDtos(authors);
    }

    /**
     * create a author
     *
     * @param authorDto the author that should be created
     * @return the created author
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public AuthorDto create(@NotNull AuthorDto authorDto) {

        checkRequiredFields(authorDto);

        if (authorDto.getUuid() != null) {
            throw new IllegalUsageOfIdentifierException();
        }

        return createOrUpdate(authorDto);
    }

    /**
     * update a author
     *
     * @param authorDto the author that should be updated
     * @return the updated author
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public AuthorDto update(@NotNull AuthorDto authorDto) {

        checkRequiredFields(authorDto);

        if (authorDto.getUuid() == null || !authorRepository.existsById(authorDto.getUuid())) {
            throw new EntityDoesNotExistException();
        }

        return createOrUpdate(authorDto);
    }


    /**
     * deletes the author
     *
     * @param uuid the author that should be deleted
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public void delete(@NotNull UUID uuid) {
        Author author = new Author();
        author.setUuid(uuid);
        authorRepository.delete(author);
    }

    /**
     * This function checks if every required parameter is set
     *
     * @param authorDto dto from request
     */
    private void checkRequiredFields(@NotNull AuthorDto authorDto) {
        if (isStringEmpty(authorDto.getName())) {
            throw new MissingFieldException("");
        }
        if (isStringEmpty(authorDto.getSurname())) {
            throw new MissingFieldException("");
        }
    }

    /**
     * create or updates a author
     *
     * @param authorDto the author that should be created or updated
     * @return the created or updated author
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private AuthorDto createOrUpdate(@NotNull AuthorDto authorDto) {
        Author author = authorMapper.authorDtoToEntity(authorDto);

        return authorMapper.authorEntityToDto(authorRepository.save(author));
    }
}
