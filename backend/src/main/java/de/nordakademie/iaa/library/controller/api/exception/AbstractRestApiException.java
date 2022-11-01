package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class AbstractRestApiException extends RuntimeException implements RestApiExceptionInterface  {

    private static final long serialVersionUID = 1L;
    private final HttpStatus httpStatusCode;
    private final String responseText;

    protected AbstractRestApiException(HttpStatus httpStatusCode, String responseText) {
        this.httpStatusCode = httpStatusCode;
        this.responseText = responseText;
    }

    public ResponseEntity<String> handle() {
        return new ResponseEntity<>(responseText, httpStatusCode);
    }
}
