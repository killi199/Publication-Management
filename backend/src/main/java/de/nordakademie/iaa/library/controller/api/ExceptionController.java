package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.api.exception.AbstractRestApiException;
import de.nordakademie.iaa.library.controller.api.exception.RestApiExceptionInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

import java.sql.SQLException;

import static org.springframework.core.NestedExceptionUtils.getRootCause;

/**
 * This controller will handle all exceptions in this application, caused by the controllerAdvice annotation.
 * Each response has to pass this controller
 */
@ControllerAdvice
public class ExceptionController {

    /**
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
     * This handles the NotReadableException from Spring Boot to return an informative error text.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity<String> exception(HttpMessageNotReadableException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.debug("Bad Request, HttpMessageNotReadableException: ", exception);

        return new ResponseEntity<>("Der Wert eines oder mehrerer Felder ist nicht valide. Bitte geben Sie gültige Werte an.", HttpStatus.BAD_REQUEST);
    }

    /**
     * This handles the NullPointerException from Spring Boot to return an informative error text.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = NullPointerException.class)
    public ResponseEntity<String> exception(NullPointerException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.error("Bad Request, NullPointerException: ", exception);

        return new ResponseEntity<>("Der Server hat einen ungültigen Status. Bitte kontaktieren Sie den Support.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * This handles the ConstraintViolationException which occurs most frequently when a child entity does not exist in our case.
     * All ConstraintViolationException concerning the existent of the object itself will be caught before.
     *
     * @return The error text as response
     */
    @ExceptionHandler(value = ConstraintViolationException.class)
    public ResponseEntity<String> exception(ConstraintViolationException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.debug("Bad Request, ConstraintViolationException: ", exception);

        return new ResponseEntity<>("Eine oder mehrere Bedingungen sind nicht vorhanden. Bitte stellen Sie sicher, dass Sie zuerst alle korrelierenden Entitäten erstellen.", HttpStatus.BAD_REQUEST);
    }

    /**
     * This handles the MethodArgumentNotValidException which occurs when a field is not valid.
     *
     * @return The error text as response
     */

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<String> exception(MethodArgumentNotValidException exception) {
        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.debug("Bad Request, MethodArgumentNotValidException: ", exception);
        String errorMessage = exception.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        String errorField = exception.getBindingResult().getFieldErrors().get(0).getField();
        if (errorMessage != null) {
            errorMessage = errorMessage.substring(0, 1).toUpperCase() + errorMessage.substring(1);
            return new ResponseEntity<>("Der Wert eines Feldes (\"" + errorField + "\") ist nicht valide. " + errorMessage, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Der Wert eines Feldes (\"" + errorField + "\") ist nicht valide. Bitte geben Sie einen gültigen Wert an.", HttpStatus.BAD_REQUEST);
    }


    /**
     * TODO write docu
     */
    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<String> exception(RuntimeException exception) {

        Throwable rootCause = getRootCause(exception);

        if (rootCause instanceof SQLException) {
            if ("23505".equals(((SQLException) rootCause).getSQLState())) {
                return new ResponseEntity<>(
                        "Einer der Werte darf nur einmal existieren, existiert jedoch bereits schon. " +
                                "Bitte überprüfen Sie ihre angaben.",
                        HttpStatus.BAD_REQUEST);
            }
        }

        Logger logger = LoggerFactory.getLogger(ExceptionController.class.getSimpleName());
        logger.error("Unhandled Exception: ", exception);
        return new ResponseEntity<>(
                "Ein unbekannter Fehler ist aufgetreten, bitte wenden Sie sich an den Support.",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
