package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * An assignment describes the lending of publications.
 * Each Publication can be lend to a borrower.
 */
@Entity
public class Assignment {
    @Id
    @GeneratedValue
    private UUID uuid;

    private Date dateOfAssignment;

    private Date dateOfReturn;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "borrower_publications",
            joinColumns = {@JoinColumn(name = "assignment_uuid")},
            inverseJoinColumns = {@JoinColumn(name = "borrower_uuid")})
    private List<Borrower> borrowers = new ArrayList<>();


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

    public List<Borrower> getBorrowers() {
        return borrowers;
    }

    public void setBorrowers(List<Borrower> borrowers) {
        this.borrowers = borrowers;
    }
}
