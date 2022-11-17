package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.BorrowerDto;
import de.nordakademie.iaa.library.service.BorrowerServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.BORROWER_BASE_PATH;

/**
 * controller borrower entity crud operations.
 */
@RestController
@RequestMapping(BORROWER_BASE_PATH)
public class BorrowerController {

    private final BorrowerServiceInterface borrowerService;

    @Autowired
    public BorrowerController(BorrowerServiceInterface borrowerService) {
        this.borrowerService = borrowerService;
    }

    /**
     * This method will fetch all borrowers from the database.
     *
     * @return a list of borrowers
     */
    @GetMapping
    public ResponseEntity<List<BorrowerDto>> getAll() {
        return new ResponseEntity<>(borrowerService.getAll(), HttpStatus.OK);
    }

    /**
     * This method will create a borrower.
     *
     * @param borrowerDto the borrower that should be created
     * @return The created borrower
     */
    @PostMapping
    public ResponseEntity<BorrowerDto> create(@RequestBody BorrowerDto borrowerDto) {
        return new ResponseEntity<>(borrowerService.create(borrowerDto), HttpStatus.OK);
    }

    /**
     * This method will update a borrower. The key is necessary to find the borrower that should be updated.
     *
     * @param borrowerDto the borrower that should be updated
     * @return The updated borrower
     */
    @PutMapping
    public ResponseEntity<BorrowerDto> update(@RequestBody BorrowerDto borrowerDto) {
        return new ResponseEntity<>(borrowerService.update(borrowerDto), HttpStatus.OK);
    }

    /**
     * This method will delete a borrower. The key is necessary to find the borrower that should be deleted.
     *
     * @param uuid the borrower that should be deleted
     * @return only the status code
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Null> delete(@PathVariable UUID uuid) {
        borrowerService.delete(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
