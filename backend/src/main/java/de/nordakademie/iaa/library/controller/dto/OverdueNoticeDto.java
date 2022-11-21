package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotNull;
import de.nordakademie.iaa.library.enums.OverdueNoticeState;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static de.nordakademie.iaa.library.controller.api.constants.ErrorMessages.VALUE_IS_EMPTY;

/**
 * An Overdue Notice will be started if the Borrower exceeds the return date.
 * It is an act where the staff of a library will warn the Borrower.
 */
public class OverdueNoticeDto {
    private UUID uuid;

    @NotNull(message = VALUE_IS_EMPTY)
    private AssignmentDto assignment;

    private Date closedAt;

    private Date openedAt;

    private OverdueNoticeState overdueNoticeState;

    private List<WarningDto> warnings = new ArrayList<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public AssignmentDto getAssignment() {
        return assignment;
    }

    public void setAssignment(AssignmentDto assignment) {
        this.assignment = assignment;
    }

    public void setClosedAt(Date closedAt) {
        this.closedAt = closedAt;
    }

    public void setOpenedAt(Date openedAt) {
        this.openedAt = openedAt;
    }

    public void setOverdueNoticeState(OverdueNoticeState overdueNoticeState) {
        this.overdueNoticeState = overdueNoticeState;
    }

    public OverdueNoticeState getOverdueNoticeState() {
        return overdueNoticeState;
    }
    public Date getClosedAt() {
        return closedAt;
    }

    public Date getOpenedAt() {
        return openedAt;
    }

    public List<WarningDto> getWarnings() {
        return warnings;
    }

    public void setWarnings(List<WarningDto> warnings) {
        this.warnings = warnings;
    }
}
