package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception will be thrown if a publication is not borrowable.
 */
public class PublicationIsNotBorrowableException extends AbstractRestApiException {

    public PublicationIsNotBorrowableException() {
        super(HttpStatus.BAD_REQUEST, "Alle Publikationen dieser Art sind bereits ausgeliehen oder die Publikation existiert nicht.");
    }
}
