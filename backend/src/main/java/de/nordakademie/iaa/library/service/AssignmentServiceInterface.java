package de.nordakademie.iaa.library.service;

import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.controller.dto.LatestReturnDateForAssignmentDateDto;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Author: Thorge Früchtenicht
 * The assignment service provides methods to handle the assignments
 */
public interface AssignmentServiceInterface {

    /**
     * get all assignments
     *
     * @return all assignments
     */
    List<AssignmentDto> getAll(boolean showClosed);


    /**
     * Marks an assignment as lost
     *
     * @param uuid
     */
    void markAssignmentAsLost(UUID uuid);

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
     * set the date of return of an assignment
     *
     * @param assignmentUUID the assignment that should be updated
     * @param returnDate the date of return of the assignment
     * @return the updated assignment
     */
    AssignmentDto returnAssignment(UUID assignmentUUID, Date returnDate);

    /**
     * Extends the assignment
     *
     * @param assignmentUUID the assignment identifier
     * @return the extended assignment
     */
    AssignmentDto extend(UUID assignmentUUID);

    /**
     * This method will return the latest return date for a given assignment date
     *
     * @param dateOfAssignment the date of assignment
     */
    LatestReturnDateForAssignmentDateDto getLatestReturnDate(Date dateOfAssignment);
}
