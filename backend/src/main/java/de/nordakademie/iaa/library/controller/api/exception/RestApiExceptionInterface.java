package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.ResponseEntity;

/**
 * This interface describes a rest api exception
 */
public interface RestApiExceptionInterface {
    ResponseEntity<String>  handle();
}
