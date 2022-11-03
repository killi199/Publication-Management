package de.nordakademie.iaa.library.controller.dto;

import java.util.UUID;


/**
 * The Author describes a person who wrote a Publication
 */
public class AuthorDto {
    private UUID uuid;

    private String surname;

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

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
