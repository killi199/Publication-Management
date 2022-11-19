package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

public class WrongDateFormatException extends AbstractRestApiException {

    public WrongDateFormatException() {
        super(HttpStatus.BAD_REQUEST, "The format of the given date is not valid. Please use following format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'.");
    }
}