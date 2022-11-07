package de.nordakademie.iaa.library.controller.dto;

import java.util.UUID;

/**
 * The Kind Of Publication organizes a Publication in different categories like: "book", "article", etc.
 */
public class KindOfPublicationDto {

    private UUID uuid;

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

    public void setValue(String value) {
        this.value = value;
    }
}
