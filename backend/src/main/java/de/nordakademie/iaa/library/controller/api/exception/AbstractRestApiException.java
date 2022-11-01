package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * This class gives an abstract implementation for a rest api exception
 */
public abstract class AbstractRestApiException extends RuntimeException implements RestApiExceptionInterface  {

    private static final long serialVersionUID = 1L;
    private final HttpStatus httpStatusCode;
    private final String responseText;

    protected AbstractRestApiException(HttpStatus httpStatusCode, String responseText) {
        this.httpStatusCode = httpStatusCode;
        this.responseText = responseText;
    }

    /**
     * This method creates a ResponseEntity from the status code and error text.
     *
     * @return The error text as response message
     */
    public ResponseEntity<String> handle() {
        return new ResponseEntity<>(responseText, httpStatusCode);
    }
}
