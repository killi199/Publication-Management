package de.nordakademie.iaa.library.service.mapper;

import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.persistent.entities.Assignment;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Author: Thorge Früchtenicht
 * This is an interface for a generated mapper.
 * This interface defines methods to map between assignmentDtos and assignments.
 */
@Component
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface AssignmentMapper {

    AssignmentDto assignmentEntityToDto(Assignment assignment);

    Assignment assignmentDtoToEntity(AssignmentDto assignmentDto);

    List<AssignmentDto> assignmentEntitiesToDtos(List<Assignment> assignmentDto);
}