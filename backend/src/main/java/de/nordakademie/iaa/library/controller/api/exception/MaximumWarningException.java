package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * Author: Nello Musmeci
 * This exception is thrown when the maximum number of warnings is reached.
 */
public class MaximumWarningException extends AbstractRestApiException {

    public MaximumWarningException() {
        super(HttpStatus.BAD_REQUEST, "Die maximale Anzahl an Warnungen ist erreicht.");
    }
}