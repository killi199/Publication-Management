package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

/**
 * A Borrower is a person that is allowed to lend a Publication.
 */
@Entity
public class Borrower {
    @Id
    @GeneratedValue
    private UUID uuid;

    private String surname;

    private String name;

    private String studentNumber;

    @OneToMany(mappedBy = "borrower",fetch = FetchType.LAZY)
    private List<Assignment> assignments;
    @PreRemove
    private void preRemove() {
        getAssignments().forEach( publication -> publication.setBorrower(null));
    }
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

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }
}
