package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.ResponseEntity;

/**
 * Author: Thorge Früchtenicht
 * This interface describes a rest api exception
 */
public interface RestApiExceptionInterface {
    ResponseEntity<String>  handle();
}
