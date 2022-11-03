package de.nordakademie.iaa.library.controller.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * An Overdue Notice will be started if the Borrower exceeds the return date.
 * It is an act where the staff of a library will warn the Borrower.
 */
public class OverdueNoticeDto {
    private UUID uuid;

    private AssignmentDto assignment;

    private List<WarningDto> warning = new ArrayList<>();

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

    public List<WarningDto> getWarning() {
        return warning;
    }

    public void setWarning(List<WarningDto> warning) {
        this.warning = warning;
    }
}
