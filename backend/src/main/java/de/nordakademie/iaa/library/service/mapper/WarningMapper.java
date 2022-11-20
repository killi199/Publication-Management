package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.WarningDto;
import de.nordakademie.iaa.library.persistent.entities.Warning;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

/**
 * This is an interface for a generated mapper.
 * This interface defines methods to map between WarningDtos and warnings.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface WarningMapper {

    WarningDto warningEntityToDto(Warning warning);
}
