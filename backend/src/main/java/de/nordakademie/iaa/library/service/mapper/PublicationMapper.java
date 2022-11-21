package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Publication;

import java.util.List;

/**
 * Author: Nello Musmeci
 * This is an interface for a mapper.
 * This interface defines methods to map between PublicationDtos and Publications.
 * The implementation of this mapper is done manually to be able to set the authors and keywords directly.
 * This lowers the number of sql queries.
 */
public interface PublicationMapper {

    /**
     * Maps entity to dto
     *
     * @param publication publication that should be mapped
     * @return the mapped publication
     */
    PublicationDto publicationEntityToDto(Publication publication);

    /**
     * Maps dto to entity
     *
     * @param publicationDto publicationsDto that should be mapped
     * @return the mapped dto
     */
    Publication publicationDtoToEntity(PublicationDto publicationDto);

    /**
     * Maps publications to publications dtos.
     *
     * @param publications the list of publicationsthat should be mapped
     * @return the mapped list
     */
    List<PublicationDto> publicationEntitiesToDtos(List<Publication> publications);
}
