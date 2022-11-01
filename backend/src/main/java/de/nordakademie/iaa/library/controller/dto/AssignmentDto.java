package de.nordakademie.iaa.library.controller.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * An assignment describes the lending of publications.
 * Each Publication can be lend to a borrower.
 */
public class AssignmentDto {
    private UUID uuid;

    private Date dateOfAssignment;

    private Date dateOfReturn;

    private List<BorrowerDto> borrowers = new ArrayList<>();


    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Date getDateOfAssignment() {
        return dateOfAssignment;
    }

    public void setDateOfAssignment(Date dateOfAssignment) {
        this.dateOfAssignment = dateOfAssignment;
    }

    public Date getDateOfReturn() {
        return dateOfReturn;
    }

    public void setDateOfReturn(Date dateOfReturn) {
        this.dateOfReturn = dateOfReturn;
    }

    public List<BorrowerDto> getBorrowers() {
        return borrowers;
    }

    public void setBorrowers(List<BorrowerDto> borrowers) {
        this.borrowers = borrowers;
    }
}
