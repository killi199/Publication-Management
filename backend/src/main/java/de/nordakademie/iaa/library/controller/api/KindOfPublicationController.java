package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.KindOfPublicationDto;
import de.nordakademie.iaa.library.service.KindOfPublicationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.KIND_OF_PUBLICATION_BASE_PATH;

/**
 * Author: Nello Musmeci
 * controller kindOfPublication entity crud operations.
 */
@RestController
@RequestMapping(KIND_OF_PUBLICATION_BASE_PATH)
public class KindOfPublicationController {

    private final KindOfPublicationServiceInterface kindOfPublicationServiceInterface;

    @Autowired
    public KindOfPublicationController(KindOfPublicationServiceInterface kindOfPublicationServiceInterface) {
        this.kindOfPublicationServiceInterface = kindOfPublicationServiceInterface;
    }

    /**
     * This method will fetch all kindOfPublications.
     *
     * @return a list of kindOfPublications
     */
    @GetMapping
    public ResponseEntity<List<KindOfPublicationDto>> getAll() {
        return new ResponseEntity<>(kindOfPublicationServiceInterface.getAll(), HttpStatus.OK);
    }

    /**
     * This method will create a kindOfPublication.
     *
     * @param kindOfPublicationDto the kindOfPublication that should be created
     * @return The created kindOfPublication
     */
    @PostMapping
    public ResponseEntity<KindOfPublicationDto> create(@RequestBody @Valid KindOfPublicationDto kindOfPublicationDto) {
        return new ResponseEntity<>(kindOfPublicationServiceInterface.create(kindOfPublicationDto), HttpStatus.OK);
    }

    /**
     * This method will update a kindOfPublication. The key is necessary to find the kindOfPublication that should be
     * updated.
     *
     * @param kindOfPublicationDto the kindOfPublication that should be updated
     * @return The updated kindOfPublication
     */
    @PutMapping
    public ResponseEntity<KindOfPublicationDto> update(@RequestBody @Valid KindOfPublicationDto kindOfPublicationDto) {
        return new ResponseEntity<>(kindOfPublicationServiceInterface.update(kindOfPublicationDto), HttpStatus.OK);
    }

    /**
     * This method will delete a kindOfPublication. The key is necessary to find the kindOfPublication that should be
     * deleted.
     *
     * @param uuid the kindOfPublication that should be deleted
     * @return only the status code
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Null> delete(@PathVariable UUID uuid) {
        kindOfPublicationServiceInterface.delete(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
