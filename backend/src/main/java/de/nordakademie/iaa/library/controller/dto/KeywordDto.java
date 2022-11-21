package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;
import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_TOO_LONG;


/**
 * Keywords can be used to describe a Publication with some simple words in an abstract form.
 */
public class KeywordDto {
    private UUID uuid;

    @NotBlank(message = VALUE_IS_EMPTY)
    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String value;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getValue() {
        return value;
    }

    /**
     * Sets the value of the keyword and trims it.
     *
     * @param value The value of the keyword.
     */
    public void setValue(String value) {
        this.value = value.trim();
    }
}
