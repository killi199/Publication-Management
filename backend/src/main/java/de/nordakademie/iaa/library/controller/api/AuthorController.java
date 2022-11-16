package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.AuthorDto;
import de.nordakademie.iaa.library.service.AuthorServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.AUTHOR_BASE_PATH;

/**
 * controller author entity crud operations.
 */
@RestController
@RequestMapping(AUTHOR_BASE_PATH)
public class AuthorController {

    private final AuthorServiceInterface authorService;

    @Autowired
    public AuthorController(AuthorServiceInterface authorService) {
        this.authorService = authorService;
    }

    /**
     * This method will fetch all authors from the database.
     *
     * @return a list of authors
     */
    @GetMapping
    public ResponseEntity<List<AuthorDto>> getAll() {
        return new ResponseEntity<>(authorService.getAll(), HttpStatus.OK);
    }

    /**
     * This method will create a author. In this case the key has to get set by the user.
     *
     * @param authorDto the author that should be created
     * @return The created author
     */
    @PostMapping
    public ResponseEntity<AuthorDto> create(@RequestBody AuthorDto authorDto) {
        return new ResponseEntity<>(authorService.create(authorDto), HttpStatus.OK);
    }

    /**
     * This method will update a author. The key is necessary to find the author that should be updated.
     *
     * @param authorDto the author that should be updated
     * @return The updated author
     */
    @PutMapping
    public ResponseEntity<AuthorDto> update(@RequestBody AuthorDto authorDto) {
        return new ResponseEntity<>(authorService.update(authorDto), HttpStatus.OK);
    }

    /**
     * This method will delete a author. The key is necessary to find the author that should be deleted.
     *
     * @param uuid the author that should be deleted
     * @return only the status code
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Null> delete(@PathVariable UUID uuid) {
        authorService.delete(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
