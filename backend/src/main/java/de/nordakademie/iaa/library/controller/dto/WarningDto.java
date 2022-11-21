package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;


/**
 * A Warning is an element in an Overdue Notice.
 * Warnings are often letters that will be sent out to the Borrower.
 */
public class WarningDto {
    private UUID uuid;

    @NotNull(message = VALUE_IS_EMPTY)
    private Date warningDate;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Date getWarningDate() {
        return warningDate;
    }

    public void setWarningDate(Date warningDate) {
        this.warningDate = warningDate;
    }
}
