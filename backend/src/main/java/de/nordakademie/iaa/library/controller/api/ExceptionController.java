package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.api.exception.AbstractRestApiException;
import de.nordakademie.iaa.library.controller.api.exception.RestApiExceptionInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * This controller will handle all exceptions in this application. Caused by the controllerAdvice annotation,
 * each response has to pass this controller
 */
@ControllerAdvice
public class ExceptionController {

    /**
     *
     * This method will handle all exceptions that extends the AbstractRestApiException.
     *
     * @param restApiException Caused by the fact, that the AbstractRestApiException implements
     *                         the RestApiExceptionInterface Spring Boot will pass the exception as
     *                         RestApiExceptionInterface here.
     * @return The error text as response
     */
    @ExceptionHandler(value = AbstractRestApiException.class)
    public ResponseEntity<String> exception(RestApiExceptionInterface restApiException) {
        return restApiException.handle();
    }

    /**
     *
     * This handles the NotReadableException from spring boot to return an informative error text.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity<String> exception(HttpMessageNotReadableException ignored) {
        return new ResponseEntity<>("The format of one or more values is not valid.", HttpStatus.BAD_REQUEST);
    }

    /**
     *
     * This handles the NotPointerException from spring boot to return an informative error text.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = NullPointerException.class)
    public ResponseEntity<String> exception(NullPointerException ignored) {
        return new ResponseEntity<>("The server has an invalid state. Please contact the support.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
