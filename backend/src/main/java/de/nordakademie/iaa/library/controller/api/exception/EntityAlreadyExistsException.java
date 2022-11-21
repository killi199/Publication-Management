package de.nordakademie.iaa.library.controller.api.exception;

import org.springframework.http.HttpStatus;

/**
 * Author: Thorge Früchtenicht
 * This exception will be thrown if an entity already exists in the database.
 */
public class EntityAlreadyExistsException extends AbstractRestApiException {

    public EntityAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, "Die Entität, die Sie versuchen zu erstellen, existiert bereits.");
    }
}
