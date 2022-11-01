package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class MissingFieldException extends AbstractRestApiException{

    public MissingFieldException(String missingField) {
        super(HttpStatus.BAD_REQUEST, "The field " + missingField + " is missing in the Request.");
    }
}
