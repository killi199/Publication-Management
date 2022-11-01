package de.nordakademie.iaa.library.controller.api;

import de.nordakademie.iaa.library.controller.api.exception.AbstractRestApiException;
import de.nordakademie.iaa.library.controller.api.exception.RestApiExceptionInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(value = AbstractRestApiException.class)
    public ResponseEntity<String> exception(RestApiExceptionInterface restApiException) {
        return restApiException.handle();
    }
}
