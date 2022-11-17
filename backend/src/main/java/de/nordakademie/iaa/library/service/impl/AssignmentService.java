package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.EntityDoesNotExistException;
import de.nordakademie.iaa.library.controller.api.exception.IllegalUsageOfIdentifierException;
import de.nordakademie.iaa.library.controller.api.exception.MaximumExtensionsException;
import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.persistent.entities.Assignment;
import de.nordakademie.iaa.library.persistent.repository.AssignmentRepository;
import de.nordakademie.iaa.library.service.AssignmentServiceInterface;
import de.nordakademie.iaa.library.service.mapper.AssignmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.*;

/**
 * The assignment service provides methods to handle the assignments
 */
@Service
@Transactional
public class AssignmentService implements AssignmentServiceInterface {

    @Value("${assignment.rentalPeriode}")
    int noOfDays;
    private final AssignmentRepository assignmentRepository;

    private final AssignmentMapper assignmentMapper;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository, AssignmentMapper assignmentMapper) {
        this.assignmentRepository = assignmentRepository;
        this.assignmentMapper = assignmentMapper;
    }

    /**
     * get all assignments
     *
     * @return all assignments
     */
    public List<AssignmentDto> getAll(boolean showReturned) {
        List<Assignment> assignments;

        if (showReturned) {
            assignments = assignmentRepository.findAll();
        } else {
            assignments = assignmentRepository.findAllUnreturned(new Date());
        }

        return assignmentMapper.assignmentEntitiesToDtos(assignments);
    }

    /**
     * get all assignments by publication key
     *
     * @return all assignments
     */
    public List<AssignmentDto> getAllByPublicationKey(String publicationKey, boolean showReturned) {
        List<Assignment> assignments;

        if (showReturned) {
            assignments = assignmentRepository.findAllByPublication_Key(publicationKey);
        } else {
            assignments = assignmentRepository.findAllUnreturnedByPublication_Key(new Date(), publicationKey);
        }

        return assignmentMapper.assignmentEntitiesToDtos(assignments);
    }

    /**
     * Get assignment by uuid
     *
     * @param assignmentUUID the identifier
     * @return found assignment
     */
    private Assignment getAssignmentByUuid(UUID assignmentUUID) {
        Optional<Assignment> assignmentOptional = assignmentRepository.findById(assignmentUUID);

        if (assignmentOptional.isEmpty()) {
            throw new EntityDoesNotExistException();
        }

        return assignmentOptional.get();
    }

    /**
     * create a assignment
     *
     * @param assignmentDto the assignment that should be created
     * @return the created assignment
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public AssignmentDto create(@NotNull AssignmentDto assignmentDto) {

        //todo check if borrowable
        checkAndFillRequiredFields(assignmentDto);

        if (assignmentDto.getUuid() != null) {
            throw new IllegalUsageOfIdentifierException();
        }

        Assignment assignment = assignmentMapper.assignmentDtoToEntity(assignmentDto);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(assignment.getDateOfAssignment());
        calendar.add(Calendar.DAY_OF_YEAR, noOfDays);

        assignment.setBorrowedUtil(calendar.getTime());

        return createOrUpdate(assignment);
    }

    /**
     * update a assignment
     *
     * @param assignmentDto the assignment that should be updated
     * @return the updated assignment
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    public AssignmentDto update(@NotNull AssignmentDto assignmentDto) {

        checkAndFillRequiredFields(assignmentDto);

        if (assignmentDto.getUuid() == null || !assignmentRepository.existsById(assignmentDto.getUuid())) {
            throw new EntityDoesNotExistException();
        }

        Assignment assignment = assignmentMapper.assignmentDtoToEntity(assignmentDto);

        Assignment assignmentOld = getAssignmentByUuid(assignment.getUuid());

        // set extensions and borrowedUtil to database values
        assignment.setExtensions(assignmentOld.getExtensions());
        assignment.setBorrowedUtil(assignmentOld.getBorrowedUtil());

        return createOrUpdate(assignment);
    }

    @Override
    public AssignmentDto extend(UUID assignmentUUID) {

        Assignment assignment = getAssignmentByUuid(assignmentUUID);

        if (assignment.getExtensions() >= 2) {
            throw new MaximumExtensionsException();
        }

        //set the number of extensions
        assignment.setExtensions(assignment.getExtensions() + 1);


        //extend the borrowed until date
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(assignment.getBorrowedUtil());
        calendar.add(Calendar.DAY_OF_YEAR, noOfDays);

        assignment.setBorrowedUtil(calendar.getTime());

        //todo delete overdue notice

        return createOrUpdate(assignment);
    }


    /**
     * This function checks if every required parameter is set
     *
     * @param assignmentDto dto from request
     */
    private void checkAndFillRequiredFields(@NotNull AssignmentDto assignmentDto) {
        if (assignmentDto.getDateOfAssignment() == null) {
            assignmentDto.setDateOfAssignment(new Date());
        }

        if (assignmentDto.getPublication() == null || assignmentDto.getPublication().getKey() == null) {
            throw new MissingFieldException("publication");
        }
    }

    /**
     * create or updates a assignment
     *
     * @param assignment the assignment that should be created or updated
     * @return the created or updated assignment
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private AssignmentDto createOrUpdate(@NotNull Assignment assignment) {
        return assignmentMapper.assignmentEntityToDto(assignmentRepository.save(assignment));
    }
}
