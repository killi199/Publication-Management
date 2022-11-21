package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * Author: Thorge Früchtenicht
 * This exception will be thrown if an entity doesn't exist in the database but should be updated.
 */
public class EntityDoesNotExistException extends AbstractRestApiException {

    public EntityDoesNotExistException() {
        super(HttpStatus.BAD_REQUEST, "Die Entität, die Sie zu aktualisieren versuchen, existiert nicht.");
    }
}
