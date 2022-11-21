package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.controller.dto.LatestReturnDateForAssignmentDateDto;
import de.nordakademie.iaa.library.service.AssignmentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.ASSIGNMENT_BASE_PATH;
import static de.nordakademie.iaa.library.helper.DateParser.parseDate;

/**
 * controller assignment entity crud operations.
 */
@RestController
@RequestMapping(ASSIGNMENT_BASE_PATH)
public class AssignmentController {

    private final AssignmentServiceInterface assignmentService;

    @Autowired
    public AssignmentController(AssignmentServiceInterface assignmentService) {
        this.assignmentService = assignmentService;
    }

    /**
     * This method will fetch all assignments from the database.
     *
     * @return a list of assignments
     */
    @GetMapping
    public ResponseEntity<List<AssignmentDto>> getAll(@RequestParam(required = false, defaultValue = "false")
                                                      boolean showReturned) {
        return new ResponseEntity<>(assignmentService.getAll(showReturned), HttpStatus.OK);
    }


    /**
     * This method will fetch all assignments from the database by publication key.
     *
     * @return a list of assignments
     */
    @GetMapping("/{publicationKey}")
    public ResponseEntity<List<AssignmentDto>> getAllByPublicationKey(@PathVariable String publicationKey,
                                                      @RequestParam(required = false, defaultValue = "false")
                                                      boolean showReturned) {
        return new ResponseEntity<>(assignmentService.getAllByPublicationKey(publicationKey, showReturned), HttpStatus.OK);
    }

    /**
     * This method will create a assignment.
     *
     * @param assignmentDto the assignment that should be created
     * @return The created assignment
     */
    @PostMapping
    public ResponseEntity<AssignmentDto> create(@RequestBody AssignmentDto assignmentDto) {
        return new ResponseEntity<>(assignmentService.create(assignmentDto), HttpStatus.OK);
    }

    /**
     * set the date of return of an assignment
     *
     * @param assignmentUUID the assignment identifier
     * @param dateOfReturnString the date of return of the assignment
     * @return the updated assignment
     */
    @PostMapping("/return/{assignmentUUID}")
    public ResponseEntity<AssignmentDto> returnAssignment(@PathVariable UUID assignmentUUID, @RequestParam(required = false, name = "dateOfReturn") String dateOfReturnString) {
        return new ResponseEntity<>(assignmentService.returnAssignment(assignmentUUID, parseDate(dateOfReturnString)), HttpStatus.OK);
    }

    /**
     * This method will extend the assignment.
     *
     * @param uuid the assignment identifier
     * @return the extended assignment
     */
    @PostMapping("/extend/{uuid}")
    public ResponseEntity<AssignmentDto> extend(@PathVariable UUID uuid) {
        return new ResponseEntity<>(assignmentService.extend(uuid), HttpStatus.OK);
    }

    /**
     * This method will close an overdue notice caused by loss.
     * This endpoint shouldn't be a deletion endpoint but couldn't be changed in time.
     *
     * @param uuid the OverdueNotice that should be deleted
     * @return only the status code
     */
    @PostMapping("/publication-lost/{uuid}")
    public ResponseEntity<Null> markAssignmentAsLost(@PathVariable UUID uuid) {
        assignmentService.markAssignmentAsLost(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * This method will return the latest return date for a given date
     *
     * @param dateOfAssignmentString the date of assignment as string
     */
    @GetMapping("/latest-return-date")
    public ResponseEntity<LatestReturnDateForAssignmentDateDto> getLatestReturnDate(
            @RequestParam(required = false, name = "dateOfAssignment") String dateOfAssignmentString) {
        return new ResponseEntity<>(
                assignmentService.getLatestReturnDate(parseDate(dateOfAssignmentString)),
                HttpStatus.OK);
    }
}
