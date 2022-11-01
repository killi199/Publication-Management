package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception will be thrown if the identifier is unexpected in this request.
 */
public class IllegalUsageOfIdentifierException extends AbstractRestApiException {

    public IllegalUsageOfIdentifierException() {
        super(HttpStatus.BAD_REQUEST,
                "The identifier shouldn't be set here.");
    }

}
