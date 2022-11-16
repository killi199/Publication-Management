package de.nordakademie.iaa.library.controller.dto;

import java.util.Date;
import java.util.UUID;

/**
 * An Assignment describes the lending of Publications.
 * Each Publication can be lent to a Borrower.
 */
public class AssignmentDto {
    private UUID uuid;

    private Date dateOfAssignment;

    private Date dateOfReturn;

    private BorrowerDto borrower;

    private int extensions;

    private PublicationDto publication;

    private boolean publicationLoss;
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

    public int getExtensions() {
        return extensions;
    }

    public void setExtensions(int extensions) {
        this.extensions = extensions;
    }

    public PublicationDto getPublication() {
        return publication;
    }

    public void setPublication(PublicationDto publication) {
        this.publication = publication;
    }

    public boolean isPublicationLoss() {
        return publicationLoss;
    }

    public void setPublicationLoss(boolean publicationLoss) {
        this.publicationLoss = publicationLoss;
    }
}
