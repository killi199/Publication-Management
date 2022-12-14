package de.nordakademie.iaa.library.service.impl;

import de.nordakademie.iaa.library.controller.api.exception.*;
import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.controller.dto.LatestReturnDateForAssignmentDateDto;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.persistent.entities.Assignment;
import de.nordakademie.iaa.library.persistent.repository.AssignmentRepository;
import de.nordakademie.iaa.library.service.AssignmentServiceInterface;
import de.nordakademie.iaa.library.service.OverdueNoticeServiceInterface;
import de.nordakademie.iaa.library.service.PublicationServiceInterface;
import de.nordakademie.iaa.library.service.WarningServiceInterface;
import de.nordakademie.iaa.library.service.mapper.AssignmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Author: Thorge Früchtenicht
 * The assignment service provides methods to handle the assignments
 */
@Service
@Transactional
public class AssignmentService implements AssignmentServiceInterface {

    @Value("${assignment.rentalPeriode}")
    int rentalPeriod;

    @Value("${assignment.maxExtensionNumber:2}")
    int maxExtensionNumber;

    @Value("${warning.maxNumber:3}")
    int maxNumberWarnings;
    private final AssignmentRepository assignmentRepository;

    private final AssignmentMapper assignmentMapper;

    private final PublicationServiceInterface publicationService;

    private final OverdueNoticeServiceInterface overdueNoticeService;

    private final WarningServiceInterface warningService;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository,
                             AssignmentMapper assignmentMapper,
                             PublicationServiceInterface publicationService,
                             OverdueNoticeServiceInterface overdueNoticeService,
                             WarningServiceInterface warningService) {
        this.assignmentRepository = assignmentRepository;
        this.assignmentMapper = assignmentMapper;
        this.publicationService = publicationService;
        this.overdueNoticeService = overdueNoticeService;
        this.warningService = warningService;
    }

    /**
     * get all assignments
     *
     * @return all assignments
     */
    public List<AssignmentDto> getAll(boolean showClosed) {
        List<Assignment> assignments;

        if (showClosed) {
            assignments = assignmentRepository.findAll();
        } else {
            assignments = assignmentRepository.findAllUnreturned(new Date());
        }

        return loadPublications(assignmentMapper.assignmentEntitiesToDtos(assignments));
    }

    /**
     * Marks an assignment as lost and deletes all overdue notices.
     * Also lowers the quantity of available publications.
     *
     * @param uuid uuid of assignment
     */
    public void markAssignmentAsLost(UUID uuid) {
        Optional<Assignment> assignmentOptional = assignmentRepository.findById(uuid);

        if (assignmentOptional.isEmpty()) {
            throw new EntityDoesNotExistException();
        }

        if (this.warningService.countAllByAssignmentUuid(uuid) < maxNumberWarnings) {
            throw new MaximumWarningsNotReachedException();
        }

        Assignment assignment = assignmentOptional.get();
        assignment.setPublicationLoss(true);

        this.overdueNoticeService.closeAllOverdueNotices(assignment);
        this.publicationService.reduceQuantityOnce(assignment.getPublication().getKey());

        this.createOrUpdate(assignment, false);
    }

    /**
     * get all assignments by publication key
     *
     * @return all assignments
     */
    public List<AssignmentDto> getAllByPublicationKey(String publicationKey, boolean showReturned) {
        List<Assignment> assignments;

        if (showReturned) {
            assignments = assignmentRepository.findAllByPublicationKey(publicationKey);
        } else {
            assignments = assignmentRepository.findAllUnreturnedByPublicationKey(new Date(), publicationKey);
        }

        return loadPublications(assignmentMapper.assignmentEntitiesToDtos(assignments));
    }

    /**
     * Preload the Publications in the assignments to lower the total number of requests performed
     *
     * @param assignments the assignments that should be loaded
     * @return List of assignments
     */
    private List<AssignmentDto> loadPublications(List<AssignmentDto> assignments) {
        List<PublicationDto> publications = publicationService.getAllByKeys(
                assignments
                        .stream()
                        .map(assignmentDto -> assignmentDto.getPublication().getKey()).collect(Collectors.toList()));

        Map<String, PublicationDto> publicationMap =
                publications
                .stream()
                .collect(Collectors.toMap(PublicationDto::getKey, Function.identity()));

        for (AssignmentDto assignment: assignments) {
            assignment.setPublication(publicationMap.get(assignment.getPublication().getKey()));
        }

        return assignments;
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

        checkAndFillRequiredFields(assignmentDto);

        if (assignmentDto.getUuid() != null) {
            throw new IllegalUsageOfIdentifierException();
        }

        checkIfBorrowable(assignmentDto.getPublication().getKey());

        Assignment assignment = assignmentMapper.assignmentDtoToEntity(assignmentDto);

        assignment.setLatestReturnDate(calculateLatestReturnDate(assignment.getDateOfAssignment()));

        return createOrUpdate(assignment, true);
    }

    /**
     * Checks if a publication is borrowable
     *
     * @param key publication key
     * @throws PublicationIsNotBorrowableException when all publications are borrowed
     */
    private void checkIfBorrowable(String key) {

        PublicationDto publication;

        try {
            publication = publicationService.getByKey(key);
        } catch (EntityDoesNotExistException exception) {
            throw new PublicationIsNotBorrowableException();
        }

        List<AssignmentDto> assignmentOnPublication = getAllByPublicationKey(key, false);

        // checks if the open assignments are bigger or equal then the quantity of the books
        if (publication.getQuantity() <= assignmentOnPublication.size()) {
            throw new PublicationIsNotBorrowableException();
        }
    }

    /**
     * set the date of return of an assignment
     *
     * @param assignmentUUID the assignment that should be updated
     * @param returnDate the date of return of the assignment, default is now
     * @return the updated assignment
     */
    @Override
    public AssignmentDto returnAssignment(UUID assignmentUUID, Date returnDate) {
        Assignment assignment = getAssignmentByUuid(assignmentUUID);

        assignment.setDateOfReturn(returnDate == null ? new Date() : returnDate);

        if (assignment.getDateOfAssignment().after(assignment.getDateOfReturn())) {
            throw new ReturnBeforeAssignmentException();
        }

        this.overdueNoticeService.closeAllOverdueNotices(assignment);

        return createOrUpdate(assignment, false);
    }

    /**
     * Extends the assignment
     *
     * @param assignmentUUID the assignment identifier
     * @return the extended assignment
     */
    @Override
    public AssignmentDto extend(UUID assignmentUUID) {

        Assignment assignment = getAssignmentByUuid(assignmentUUID);

        if (assignment.getExtensions() >= maxExtensionNumber) {
            throw new MaximumExtensionsException();
        }

        //set the number of extensions
        assignment.setExtensions(assignment.getExtensions() + 1);


        //extend the borrowed until date
        assignment.setLatestReturnDate(calculateLatestReturnDate(assignment.getLatestReturnDate()));

        this.overdueNoticeService.closeAllOverdueNotices(assignment);

        return createOrUpdate(assignment, true);
    }

    /**
     * This method will return the latest return date for a given date
     *
     * @param dateOfAssignment the date of assignment
     */
    @Override
    public LatestReturnDateForAssignmentDateDto getLatestReturnDate(Date dateOfAssignment) {

        if (dateOfAssignment == null) {
            dateOfAssignment = new Date();
        }

        return new LatestReturnDateForAssignmentDateDto(dateOfAssignment, calculateLatestReturnDate(dateOfAssignment));
    }

    /**
     * Calculates the latest return date from a given date
     *
     * @param date this date can either be the old latestReturnDate or the date of assignment
     */
    private Date calculateLatestReturnDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, rentalPeriod);

        return calendar.getTime();
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

        if (assignmentDto.getDateOfReturn() != null &&
                assignmentDto.getDateOfAssignment().after(assignmentDto.getDateOfReturn())) {
            throw new ReturnBeforeAssignmentException();
        }
    }

    /**
     * create or updates an assignment.
     * On every create or update a new overdue notice will be created with the state reserved.
     * On an update all other will be closed or deleted before.
     * </p>
     * This is an easy and performant way to create an overdue notice exactly one day after the latest return date.
     * Other methods would have been to have async task runner or create the overdue notice at the overdue notice
     * get request.
     *
     * @param assignment the assignment that should be created or updated
     * @return the created or updated assignment
     * \@NotNull is here for documentation and does nothing.
     * This method should not be called with null values.
     */
    private AssignmentDto createOrUpdate(@NotNull Assignment assignment, boolean createNewOverdueNotice) {
        assignment = assignmentRepository.saveAndRefresh(assignment);

        if (createNewOverdueNotice) {
            overdueNoticeService.createOverdueNotice(assignment);
        }

        return assignmentMapper.assignmentEntityToDto(assignment);
    }
}
