package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class MaximumWarningException extends AbstractRestApiException {

    public MaximumWarningException() {
        super(HttpStatus.BAD_REQUEST, "The maximum number of warnings is reached. " +
                "Please consider to delete this overdue notice caused by a loss.");
    }
}