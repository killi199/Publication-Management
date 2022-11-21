package de.nordakademie.iaa.library.persistent.entities;

import de.nordakademie.iaa.library.enums.OverdueNoticeState;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * An Overdue Notice will be started if the Borrower exceeds the return date.
 * It is an act where the staff of a library will warn the Borrower.
 */
@Entity
public class OverdueNotice {

    @Id
    @GeneratedValue
    private UUID uuid;

    @ManyToOne
    @NotNull
    private Assignment assignment;

    private Date closedAt;

    @NotNull
    private Date openedAt = new Date();

    @OneToMany(mappedBy = "overdueNotice", fetch = FetchType.LAZY)
    private List<Warning> warnings = new ArrayList<>();

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

    public List<Warning> getWarnings() {
        return warnings;
    }

    public void setWarnings(List<Warning> warnings) {
        this.warnings = warnings;
    }

    public Date getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(Date closedAt) {
        this.closedAt = closedAt;
    }

    public Date getOpenedAt() {
        return openedAt;
    }

    public void setOpenedAt(Date openedAt) {
        this.openedAt = openedAt;
    }

    @Transient
    public OverdueNoticeState getOverdueNoticeState() {
        Date date = new Date();

        if (closedAt != null) {
            return OverdueNoticeState.CLOSED;
        } else if (date.after(openedAt)) {
            return OverdueNoticeState.OPENED;
        }

        return OverdueNoticeState.RESERVED;
    }
}
