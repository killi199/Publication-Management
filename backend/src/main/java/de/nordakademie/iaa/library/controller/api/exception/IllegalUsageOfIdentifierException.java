package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class IllegalUsageOfIdentifierException extends AbstractRestApiException {

    public IllegalUsageOfIdentifierException() {
        super(HttpStatus.BAD_REQUEST,
                "The identifier shouldn't be set here.");
    }

}
