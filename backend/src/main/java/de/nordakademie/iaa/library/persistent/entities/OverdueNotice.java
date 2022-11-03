package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * An Overdue Notice will be started if the Borrower exceeds the return date.
 * It is an act where the staff of a library will warn the Borrower.
 */
@Entity
public class OverdueNotice {
    @Id
    @GeneratedValue
    private UUID uuid;

    @ManyToOne
    private Assignment assignment;

    @OneToMany
    private List<Warning> warning = new ArrayList<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public List<Warning> getWarning() {
        return warning;
    }

    public void setWarning(List<Warning> warning) {
        this.warning = warning;
    }
}
