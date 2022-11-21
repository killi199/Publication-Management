package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

/**
 * An Assignment describes the lending of Publications.
 * Each Publication can be lent to a Borrower.
 */
@Entity
public class Assignment {

    @Id
    @GeneratedValue
    private UUID uuid;

    @NotNull
    @Column(updatable = false)
    private Date dateOfAssignment;

    private Date dateOfReturn;

    private boolean publicationLoss;

    @ManyToOne(fetch = FetchType.LAZY)
    private Borrower borrower;

    private int extensions;

    @NotNull
    private Date latestReturnDate;


    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Publication publication;

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

    public Borrower getBorrower() {
        return borrower;
    }

    public void setBorrower(Borrower borrower) {
        this.borrower = borrower;
    }

    public boolean isPublicationLoss() {
        return publicationLoss;
    }

    public void setPublicationLoss(boolean publicationLoss) {
        this.publicationLoss = publicationLoss;
    }

    public int getExtensions() {
        return extensions;
    }

    public void setExtensions(int extensions) {
        this.extensions = extensions;
    }

    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public Date getLatestReturnDate() {
        return latestReturnDate;
    }

    public void setLatestReturnDate(Date latestReturnDate) {
        this.latestReturnDate = latestReturnDate;
    }

}
