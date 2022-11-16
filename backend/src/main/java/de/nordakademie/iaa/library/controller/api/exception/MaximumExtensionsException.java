package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class MaximumExtensionsException extends AbstractRestApiException{

    public MaximumExtensionsException() {
        super(HttpStatus.BAD_REQUEST, "The assignment has reached the maximum extensions.");
    }
}
