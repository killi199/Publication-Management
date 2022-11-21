package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * This exception will be thrown when an overdue notice is closed or does not exists.
 */
public class OverdueNoticeIsClosedException extends AbstractRestApiException {

    public OverdueNoticeIsClosedException() {
        super(HttpStatus.BAD_REQUEST, "Overdue notice is closed or does not exists. No warning could be created.");
    }
}