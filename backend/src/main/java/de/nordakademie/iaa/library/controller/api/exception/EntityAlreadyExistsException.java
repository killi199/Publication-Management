package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class EntityAlreadyExistsException extends AbstractRestApiException {

    public EntityAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, "The entity you try to create already exits. You can override it if you want.");
    }
}
