package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class MaximumWarningsNotReachedException extends AbstractRestApiException {

    public MaximumWarningsNotReachedException() {
        super(HttpStatus.BAD_REQUEST, "To mark a book as lost you have to sent out the maximum number of warnings.");
    }
}
