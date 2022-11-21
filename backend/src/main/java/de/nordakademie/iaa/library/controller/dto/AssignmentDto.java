package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;

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

    @NotNull(message = VALUE_IS_EMPTY)
    private PublicationDto publication;

    private Date latestReturnDate;

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

    public Date getLatestReturnDate() {
        return latestReturnDate;
    }

    public void setLatestReturnDate(Date latestReturnDate) {
        this.latestReturnDate = latestReturnDate;
    }

    public boolean isPublicationLoss() {
        return publicationLoss;
    }

    public void setPublicationLoss(boolean publicationLoss) {
        this.publicationLoss = publicationLoss;
    }
}
