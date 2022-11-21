package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * Author: Nello Musmeci
 * This exception is thrown if the date format given cannot be matched to the dateformat needed.
 */
public class WrongDateFormatException extends AbstractRestApiException {

    public WrongDateFormatException() {
        super(HttpStatus.BAD_REQUEST, "Das Format des angegebenen Datums ist nicht gültig. Bitte verwenden Sie folgendes Format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z' (Beispiel: 2022-01-16T05:50:06.000+00:00).");
    }
}