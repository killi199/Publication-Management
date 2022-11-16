package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.AssignmentDto;
import de.nordakademie.iaa.library.service.AssignmentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.ASSIGNMENT_BASE_PATH;

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
     * This method will create a assignment. In this case the key has to get set by the user.
     *
     * @param assignmentDto the assignment that should be created
     * @return The created assignment
     */
    @PostMapping
    public ResponseEntity<AssignmentDto> create(@RequestBody AssignmentDto assignmentDto) {
        return new ResponseEntity<>(assignmentService.create(assignmentDto), HttpStatus.OK);
    }

    /**
     * This method will update a assignment. The key is necessary to find the assignment that should be updated.
     *
     * @param assignmentDto the assignment that should be updated
     * @return The updated assignment
     */
    @PutMapping
    public ResponseEntity<AssignmentDto> update(@RequestBody AssignmentDto assignmentDto) {
        return new ResponseEntity<>(assignmentService.update(assignmentDto), HttpStatus.OK);
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
}
