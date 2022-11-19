package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

/**
 * A Warning is a element in an Overdue Notice.
 * Warnings are often letters that will be sent out to the Borrower.
 */
@Entity
public class Warning {
    @Id
    @GeneratedValue
    private UUID uuid;

    @ManyToOne
    @NotNull
    private OverdueNotice overdueNotice;

    @NotNull
    private Date warningDate;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public OverdueNotice getOverdueNoticeUuid() {
        return overdueNotice;
    }

    public void setOverdueNoticeUuid(OverdueNotice overdueNotice) {
        this.overdueNotice = overdueNotice;
    }

    public Date getWarningDate() {
        return warningDate;
    }

    public void setWarningDate(Date warningDate) {
        this.warningDate = warningDate;
    }
}
