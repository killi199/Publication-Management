package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Publication;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * This is an interface for a generated mapper.
 * This interface defines methods to map between publicationDtos and publications.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface PublicationMapper {

    PublicationDto publicationEntityToDto(Publication publicationDto);

    Publication publicationDtoToEntity(PublicationDto publicationDto);

    List<PublicationDto> publicationEntitiesToDtos(List<Publication> publicationDto);
}
