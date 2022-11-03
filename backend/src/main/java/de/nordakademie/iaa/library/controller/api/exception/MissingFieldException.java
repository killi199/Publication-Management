package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception will be thrown if a field is missing in the request.
 */
public class MissingFieldException extends AbstractRestApiException{

    public MissingFieldException(String missingField) {
        super(HttpStatus.BAD_REQUEST, "The field " + missingField + " is missing in the Request.");
    }
}
