package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception is thrown if an assignment return date is before the date of assignment.
 */
public class ReturnBeforeAssignmentException extends AbstractRestApiException {

    public ReturnBeforeAssignmentException() {
        super(HttpStatus.BAD_REQUEST, "Das Rückgabedatum darf nicht vor dem Ausleihdatum liegen.");
    }
}