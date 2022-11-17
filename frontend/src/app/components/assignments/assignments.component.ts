import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Borrower } from 'src/app/models/borrower';
import { AssignmentService } from 'src/app/services/assignment.service';
import { BorrowerService } from 'src/app/services/borrower.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent implements OnInit {
    assignments: Observable<Assignment[]>;
    openAssignment: boolean = false;
    borrowers: Borrower[] = [];
    currentAssignment?: Assignment;
    constructor(assignmentService: AssignmentService, private borrowerService: BorrowerService) {
        this.assignments = assignmentService.loadAllAssignments();
    }

    ngOnInit(): void {
        this.borrowerService
            .loadAllBorrowers()
            .subscribe((borrowers) => (this.borrowers = borrowers));
    }

    onBack(): void {
        this.currentAssignment = undefined;
        this.openAssignment = false;
    }

    onEdit(): void {
        this.openAssignment = true;
    }

    onAdd(): void {
        this.currentAssignment = undefined;
        this.openAssignment = true;
    }

    onSelect(assignment: Assignment): void {
        this.currentAssignment = assignment;
    }
}
