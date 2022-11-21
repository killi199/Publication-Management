package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;
import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_TOO_LONG;
import static de.nordakademie.iaa.library.helper.StringTrimmer.trimIfNotNull;

/**
 * The Kind Of Publication organizes a Publication in different categories like: "book", "article", etc.
 */
public class KindOfPublicationDto {

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
     * Sets the value of the kind of publication and trims it.
     *
     * @param value The value of the kind of publication.
     */
    public void setValue(String value) {
        this.value = trimIfNotNull(value);
    }
}
