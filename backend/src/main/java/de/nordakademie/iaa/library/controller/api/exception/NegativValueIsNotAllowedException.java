package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class NegativValueIsNotAllowedException extends AbstractRestApiException {

    public NegativValueIsNotAllowedException(String field) {
        super(HttpStatus.BAD_REQUEST, "The field " + field + " is not allowed to be negative.");
    }
}
