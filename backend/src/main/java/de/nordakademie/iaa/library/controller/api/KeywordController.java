package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.KeywordDto;
import de.nordakademie.iaa.library.service.KeywordServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.PUBLICATION_BASE_PATH;

/**
 * controller keyword entity crud operations.
 */
@RestController
@RequestMapping(PUBLICATION_BASE_PATH)
public class KeywordController {

    private final KeywordServiceInterface keywordService;

    @Autowired
    public KeywordController(KeywordServiceInterface keywordService) {
        this.keywordService = keywordService;
    }

    /**
     * This method will fetch all keywords from the database.
     *
     * @return a list of keywords
     */
    @GetMapping
    public ResponseEntity<List<KeywordDto>> getAll() {
        return new ResponseEntity<>(keywordService.getAll(), HttpStatus.OK);
    }

    /**
     * This method will create a keyword. In this case the key has to get set by the user.
     *
     * @param keywordDto the keyword that should be created
     * @return The created keyword
     */
    @PostMapping
    public ResponseEntity<KeywordDto> create(@RequestBody KeywordDto keywordDto) {
        return new ResponseEntity<>(keywordService.create(keywordDto), HttpStatus.OK);
    }

    /**
     * This method will update a keyword. The key is necessary to find the keyword that should be updated.
     *
     * @param keywordDto the keyword that should be updated
     * @return The updated keyword
     */
    @PutMapping
    public ResponseEntity<KeywordDto> update(@RequestBody KeywordDto keywordDto) {
        return new ResponseEntity<>(keywordService.update(keywordDto), HttpStatus.OK);
    }

    /**
     * This method will delete a keyword. The key is necessary to find the keyword that should be deleted.
     *
     * @param uuid the keyword that should be deleted
     * @return only the status code
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Null> delete(@PathVariable UUID uuid) {
        keywordService.delete(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
