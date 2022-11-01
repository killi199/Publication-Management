package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.ResponseEntity;

public interface RestApiExceptionInterface {
    ResponseEntity<String>  handle();
}
