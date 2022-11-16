package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.AuthorDto;
import de.nordakademie.iaa.library.persistent.entities.Author;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * This is an interface for a generated mapper.
 * This interface defines methods to map between authorDtos and authors.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface AuthorMapper {

    AuthorDto authorEntityToDto(Author author);

    Author authorDtoToEntity(AuthorDto authorDto);

    List<AuthorDto> authorEntitiesToDtos(List<Author> authorDto);
}