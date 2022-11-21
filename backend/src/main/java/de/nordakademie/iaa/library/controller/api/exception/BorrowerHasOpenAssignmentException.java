package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception is thrown when you try to delete a borrower that has unreturned publications.
 */
public class BorrowerHasOpenAssignmentException extends AbstractRestApiException {

    public BorrowerHasOpenAssignmentException() {
        super(HttpStatus.BAD_REQUEST, "Der Ausleiher konnte nicht gelöscht werden, da noch ein oder mehrere Ausleihvorgänge offen sind.");
    }
}