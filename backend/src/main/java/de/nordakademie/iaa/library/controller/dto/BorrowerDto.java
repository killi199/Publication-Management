package de.nordakademie.iaa.library.controller.dto;

import java.util.UUID;

/**
 * A borrower is a person that is allowed to lend a publication.
 */
public class BorrowerDto {

    private UUID uuid;

    private String surname;

    private String name;

    private String studentNumber;

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

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }
}
