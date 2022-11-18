package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception will be thrown if an entity already exists in the database.
 */
public class EntityAlreadyExistsException extends AbstractRestApiException {

    public EntityAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, "The entity you try to create already exists.");
    }
}
