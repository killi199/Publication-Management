package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.AssignmentDto;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * The assignment service provides methods to handle the assignments
 */
public interface AssignmentServiceInterface {

    /**
     * get all assignments
     *
     * @return all assignments
     */
    List<AssignmentDto> getAll(boolean showReturned);

    /**
     * get all assignments
     *
     * @return all assignments
     */
    List<AssignmentDto> getAllByPublicationKey(@NotNull String publicationKey, boolean showReturned);

    /**
     * create a assignment
     *
     * @param assignmentDto the assignment that should be created
     * @return the created assignment
     */
    AssignmentDto create(AssignmentDto assignmentDto);

    /**
     * update a assignment
     *
     * @param assignmentDto the assignment that should be updated
     * @return the updated assignment
     */
    AssignmentDto update(AssignmentDto assignmentDto);

    /**
     * Extends the assignment
     *
     * @param assignmentUUID the assignment identifier
     * @return the extended assignment
     */
    AssignmentDto extend(UUID assignmentUUID);
}
