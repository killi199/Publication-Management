package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

/**
 * Author: Nello Musmeci
 * A Warning is a element in an Overdue Notice.
 * Warnings are often letters that will be sent out to the Borrower.
 */
@Entity
public class Warning {
    @Id
    @GeneratedValue
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY)
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

    public OverdueNotice getOverdueNotice() {
        return overdueNotice;
    }

    public void setOverdueNotice(OverdueNotice overdueNotice) {
        this.overdueNotice = overdueNotice;
    }

    public Date getWarningDate() {
        return warningDate;
    }

    public void setWarningDate(Date warningDate) {
        this.warningDate = warningDate;
    }
}
