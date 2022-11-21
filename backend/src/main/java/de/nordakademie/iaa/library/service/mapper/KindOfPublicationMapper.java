package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.KindOfPublicationDto;
import de.nordakademie.iaa.library.persistent.entities.KindOfPublication;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Author: Nello Musmeci
 * This is an interface for a generated mapper.
 * This interface defines methods to map between kindOfPublicationDtos and kindOfPublications.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface KindOfPublicationMapper {

    KindOfPublicationDto kindOfPublicationEntityToDto(KindOfPublication kindOfPublication);

    KindOfPublication kindOfPublicationDtoToEntity(KindOfPublicationDto kindOfPublicationDto);

    List<KindOfPublicationDto> kindOfPublicationEntitiesToDtos(List<KindOfPublication> kindOfPublicationDto);
}
