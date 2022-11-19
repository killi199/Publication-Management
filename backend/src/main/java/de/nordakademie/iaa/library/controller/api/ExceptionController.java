package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.api.exception.AbstractRestApiException;
import de.nordakademie.iaa.library.controller.api.exception.RestApiExceptionInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

/**
 * This controller will handle all exceptions in this application, caused by the controllerAdvice annotation.
 * Each response has to pass this controller
 */
@ControllerAdvice
public class ExceptionController {

    /**
     *
     * This method will handle all exceptions that extends the AbstractRestApiException.
     *
     * @param restApiException Caused by the fact, that the AbstractRestApiException implements
     *                         the RestApiExceptionInterface, Spring Boot will pass the exception as
     *                         RestApiExceptionInterface here.
     * @return The error text as response
     */
    @ExceptionHandler(value = AbstractRestApiException.class)
    public ResponseEntity<String> exception(RestApiExceptionInterface restApiException) {
        return restApiException.handle();
    }

    /**
     *
     * This handles the NotReadableException from Spring Boot to return an informative error text.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity<String> exception(HttpMessageNotReadableException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.error("Bad Request: ", exception);

        return new ResponseEntity<>("The format of one or more values is not valid.", HttpStatus.BAD_REQUEST);
    }

    /**
     *
     * This handles the NullPointerException from Spring Boot to return an informative error text.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = NullPointerException.class)
    public ResponseEntity<String> exception(NullPointerException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.error("NullPointerException: ", exception);

        return new ResponseEntity<>("The server has an invalid state. Please contact the support.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     *
     * This handles the ConstraintViolationException which occurs most frequently when a child entity does not exist in our case.
     * All ConstraintViolationException concerning the existent of the object itself will be caught before.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = ConstraintViolationException.class)
    public ResponseEntity<String> exception(ConstraintViolationException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.error("Constraint Exception: ", exception);

        return new ResponseEntity<>("One or more constraints does not exist. Please make sure to create all correlating entities first.", HttpStatus.BAD_REQUEST);
    }
}
