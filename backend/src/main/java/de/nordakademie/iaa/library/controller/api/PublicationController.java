package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.api.exception.MissingFieldException;
import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.service.PublicationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.PUBLICATION_BASE_PATH;

/**
 * controller publication entity crud operations.
 */
@RestController
@RequestMapping(PUBLICATION_BASE_PATH)
public class PublicationController {

    private final PublicationServiceInterface publicationService;

    @Autowired
    public PublicationController(PublicationServiceInterface publicationService) {
        this.publicationService = publicationService;
    }

    /**
     * This method will fetch all publications from the database.
     *
     * @return a list of publications
     */
    @GetMapping
    public ResponseEntity<List<PublicationDto>> getAll() {
        return new ResponseEntity<>(publicationService.getAll(), HttpStatus.OK);
    }

    /**
     * This method will create a publication. In this case the key has to get set by the user.
     *
     * @param publicationDto the publication that should be created
     * @return The created publication
     */
    @PostMapping
    public ResponseEntity<PublicationDto> create(@RequestBody PublicationDto publicationDto) {
        return new ResponseEntity<>(publicationService.create(publicationDto), HttpStatus.OK);
    }

    /**
     * This method will update a publication. The key is necessary to find the publication that should be updated.
     *
     * @param publicationDto the publication that should be updated
     * @return The updated publication
     */
    @PutMapping
    public ResponseEntity<PublicationDto> update(@RequestBody PublicationDto publicationDto) {
        return new ResponseEntity<>(publicationService.update(publicationDto), HttpStatus.OK);
    }

    /**
     * This method will delete a publication. The key is necessary to find the publication that should be deleted.
     *
     * @param key the publication that should be deleted
     * @return only the status code
     */
    @DeleteMapping("/{key}")
    public ResponseEntity<Null> delete(@PathVariable String key) {

        if (key == null) {
            throw new MissingFieldException("key");
        }

        publicationService.delete(key);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
