import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent {
    assignments: Observable<Assignment[]>;
    openAssignment: boolean = false;
    currentAssignment?: Assignment;
    constructor(assignmentService: AssignmentService) {
        this.assignments = assignmentService.loadAllAssignments();
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
