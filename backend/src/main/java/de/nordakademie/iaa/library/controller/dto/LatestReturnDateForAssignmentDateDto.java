package de.nordakademie.iaa.library.controller.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * A combination of an assignment date and the latest return date
 */
public class LatestReturnDateForAssignmentDateDto {

    @NotNull
    private Date dateOfAssignment;

    @NotNull
    private Date latestReturnDate;

    public LatestReturnDateForAssignmentDateDto(Date dateOfAssignment, Date latestReturnDate) {
        this.dateOfAssignment = dateOfAssignment;
        this.latestReturnDate = latestReturnDate;
    }

    public Date getDateOfAssignment() {
        return dateOfAssignment;
    }

    public void setDateOfAssignment(Date dateOfAssignment) {
        this.dateOfAssignment = dateOfAssignment;
    }

    public Date getLatestReturnDate() {
        return latestReturnDate;
    }

    public void setLatestReturnDate(Date latestReturnDate) {
        this.latestReturnDate = latestReturnDate;
    }
}
