package de.nordakademie.iaa.library.persistent.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.UUID;

@Entity
public class Warning {
    @Id
    @GeneratedValue
    private UUID uuid;

    @ManyToOne
    private OverdueNotice overdueNoticeUuid;

    private Date warningDate;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public OverdueNotice getOverdueNoticeUuid() {
        return overdueNoticeUuid;
    }

    public void setOverdueNoticeUuid(OverdueNotice overdueNoticeUuid) {
        this.overdueNoticeUuid = overdueNoticeUuid;
    }

    public Date getWarningDate() {
        return warningDate;
    }

    public void setWarningDate(Date warningDate) {
        this.warningDate = warningDate;
    }
}
