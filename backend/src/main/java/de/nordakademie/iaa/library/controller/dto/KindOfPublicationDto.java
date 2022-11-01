package de.nordakademie.iaa.library.controller.dto;

import java.util.UUID;

/**
 * The kind of publication organizes a publication in different categories like: "book", "articel", etc.
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
