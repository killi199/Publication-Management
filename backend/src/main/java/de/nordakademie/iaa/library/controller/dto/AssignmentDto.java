package de.nordakademie.iaa.library.controller.dto;

import java.util.Date;
import java.util.UUID;

/**
 * An Assignment describes the lending of Publications.
 * Each Publication can be lend to a Borrower.
 */
public class AssignmentDto {
    private UUID uuid;

    private Date dateOfAssignment;

    private Date dateOfReturn;

    private BorrowerDto borrower;


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

    public BorrowerDto getBorrower() {
        return borrower;
    }

    public void setBorrower(BorrowerDto borrower) {
        this.borrower = borrower;
    }
}
