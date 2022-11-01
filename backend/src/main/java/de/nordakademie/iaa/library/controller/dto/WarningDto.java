package de.nordakademie.iaa.library.controller.dto;

import java.util.Date;
import java.util.UUID;

public class WarningDto {
    private UUID uuid;

    private OverdueNoticeDto overdueNoticeUuid;

    private Date warningDate;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public OverdueNoticeDto getOverdueNoticeUuid() {
        return overdueNoticeUuid;
    }

    public void setOverdueNoticeUuid(OverdueNoticeDto overdueNoticeUuid) {
        this.overdueNoticeUuid = overdueNoticeUuid;
    }

    public Date getWarningDate() {
        return warningDate;
    }

    public void setWarningDate(Date warningDate) {
        this.warningDate = warningDate;
    }
}
