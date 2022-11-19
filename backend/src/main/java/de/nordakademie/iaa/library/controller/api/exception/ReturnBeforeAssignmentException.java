package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class ReturnBeforeAssignmentException extends AbstractRestApiException {

    public ReturnBeforeAssignmentException() {
        super(HttpStatus.BAD_REQUEST, "The date of return can not be earlier than the date of assignment.");
    }
}