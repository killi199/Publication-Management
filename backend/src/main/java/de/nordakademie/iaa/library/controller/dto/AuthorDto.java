package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;
import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_TOO_LONG;
import static de.nordakademie.iaa.library.helper.StringTrimmer.trimIfNotNull;


/**
 * The Author describes a person who wrote a Publication
 */
public class AuthorDto {

    private UUID uuid;

    @NotBlank(message = VALUE_IS_EMPTY)
    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String surname;

    @NotBlank(message = VALUE_IS_EMPTY)
    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String name;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getSurname() {
        return surname;
    }

    /**
     * Sets the surname of the author and trims it.
     *
     * @param surname The surname of the author.
     */
    public void setSurname(String surname) {
        this.surname = trimIfNotNull(surname);
    }

    public String getName() {
        return name;
    }

    /**
     * Sets the name of the author and trims it.
     *
     * @param name The name of the author.
     */
    public void setName(String name) {
        this.name = trimIfNotNull(name);
    }
}
