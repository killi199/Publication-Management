package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.dto.WarningDto;
import de.nordakademie.iaa.library.service.WarningServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ApiPath.WARNING_BASE_PATH;

/**
 * Author: Nello Musmeci
 * controller to create warnings.
 */
@RestController
@RequestMapping(WARNING_BASE_PATH)
public class WarningController {

    private WarningServiceInterface warningService;

    @Autowired
    public WarningController(WarningServiceInterface warningService) {
        this.warningService = warningService;
    }


    /**
     * This method will create a warning.
     *
     * @param uuid the overdue notice identifier
     * @return the created warning
     */
    @PostMapping("/{uuid}")
    public ResponseEntity<WarningDto> extend(@PathVariable UUID uuid) {
        return new ResponseEntity<>(warningService.create(uuid), HttpStatus.OK);
    }
}
