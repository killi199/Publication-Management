package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class EntityDoesNotExistException extends AbstractRestApiException {

    public EntityDoesNotExistException() {
        super(HttpStatus.BAD_REQUEST, "The entity you try to update does not exits.");
    }
}
