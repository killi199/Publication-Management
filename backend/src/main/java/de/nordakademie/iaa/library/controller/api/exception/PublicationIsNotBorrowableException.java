package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class PublicationIsNotBorrowableException extends AbstractRestApiException {

    public PublicationIsNotBorrowableException() {
        super(HttpStatus.BAD_REQUEST, "All publications of this type are already borrowed or the publication does not exist.");
    }
}
