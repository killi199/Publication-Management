package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception is thrown if the maximum amount of assignment extensions is reached.
 */
public class MaximumExtensionsException extends AbstractRestApiException{

    public MaximumExtensionsException() {
        super(HttpStatus.BAD_REQUEST, "The assignment has reached the maximum amount of extensions.");
    }
}
