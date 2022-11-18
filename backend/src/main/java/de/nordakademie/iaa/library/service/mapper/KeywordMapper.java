package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.KeywordDto;
import de.nordakademie.iaa.library.persistent.entities.Keyword;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * This is an interface for a generated mapper.
 * This interface defines methods to map between keywordDtos and keywords.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface KeywordMapper {

    KeywordDto keywordEntityToDto(Keyword keyword);

    Keyword keywordDtoToEntity(KeywordDto keywordDto);

    List<KeywordDto> keywordEntitiesToDtos(List<Keyword> keywordDto);
}
