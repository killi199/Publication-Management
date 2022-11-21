package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * Author: Thorge Früchtenicht
 * This exception will be thrown when an overdue notice is closed or does not exists.
 */
public class OverdueNoticeIsClosedException extends AbstractRestApiException {

    public OverdueNoticeIsClosedException() {
        super(HttpStatus.BAD_REQUEST, "Das Mahnungsverfahren ist momentan nicht offen.");
    }
}