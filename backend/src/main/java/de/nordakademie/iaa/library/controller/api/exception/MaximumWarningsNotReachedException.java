package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * Author: Nello Musmeci
 * Will be thrown when a assignment hasn't got the needed warnings to be marked as lost.
 */
public class MaximumWarningsNotReachedException extends AbstractRestApiException {

    public MaximumWarningsNotReachedException() {
        super(HttpStatus.BAD_REQUEST, "Um ein Buch als verloren zu melden, " +
                "müssen erst alle Mahnungen versendet werden.");
    }
}
