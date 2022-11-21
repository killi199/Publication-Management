package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception is thrown when you try to delete a borrower that has unreturned publications.
 */
public class BorrowerHasOpenAssignmentException extends AbstractRestApiException {

    public BorrowerHasOpenAssignmentException() {
        super(HttpStatus.BAD_REQUEST, "Could not delete the borrower, one or more assignments are open.");
    }
}