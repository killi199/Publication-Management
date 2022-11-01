package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.PublicationDto;
import de.nordakademie.iaa.library.service.PublicationService;
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

    private final PublicationService publicationService;

    @Autowired
    public PublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    @GetMapping
    public ResponseEntity<List<PublicationDto>> getAll() {
        return new ResponseEntity<>(publicationService.getAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PublicationDto> create(@RequestBody PublicationDto publicationDto) {
        return new ResponseEntity<>(publicationService.create(publicationDto), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<PublicationDto> update(@RequestBody PublicationDto publicationDto) {
        return new ResponseEntity<>(publicationService.update(publicationDto), HttpStatus.OK);
    }

    @DeleteMapping("/{key}")
    public ResponseEntity<Null> delete(@PathVariable String key) {

        publicationService.delete(key);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
