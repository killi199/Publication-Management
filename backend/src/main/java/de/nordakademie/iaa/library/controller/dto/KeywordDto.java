package de.nordakademie.iaa.library.controller.dto;

import java.util.UUID;


/**
 * Keywords can be used to describe a publication with some simple words in a abstract form.
 */
public class KeywordDto {
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
