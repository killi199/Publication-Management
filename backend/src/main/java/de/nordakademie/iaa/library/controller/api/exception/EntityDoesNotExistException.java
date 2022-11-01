package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception will be thrown if a entity doesn't exists in the database but should be updated.
 */
public class EntityDoesNotExistException extends AbstractRestApiException {

    public EntityDoesNotExistException() {
        super(HttpStatus.BAD_REQUEST, "The entity you try to update does not exits.");
    }
}
