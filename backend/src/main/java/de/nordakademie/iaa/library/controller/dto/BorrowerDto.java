package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;
import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_TOO_LONG;

/**
 * A Borrower is a person that is allowed to lend a Publication.
 */
public class BorrowerDto {

    private UUID uuid;

    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String surname;

    @Size(max = 255, message = VALUE_IS_TOO_LONG)
    private String name;

    @NotBlank(message = VALUE_IS_EMPTY)
    @Size(max = 255, message = VALUE_IS_TOO_LONG)
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

    /**
     * Sets the surname of the borrower and trims it.
     *
     * @param surname The surname of the borrower.
     */
    public void setSurname(String surname) {
        this.surname = surname.trim();
    }

    public String getName() {
        return name;
    }

    /**
     * Sets the name of the borrower and trims it.
     *
     * @param name The name of the borrower.
     */
    public void setName(String name) {
        this.name = name.trim();
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }
}
