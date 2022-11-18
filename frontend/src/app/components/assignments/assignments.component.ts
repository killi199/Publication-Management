import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Borrower } from 'src/app/models/borrower';
import { AssignmentService } from 'src/app/services/assignment.service';
import { BorrowerService } from 'src/app/services/borrower.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class AssignmentsComponent implements OnInit {
    data: Observable<Assignment[]>;
    extendAssignment?: (assignment: Assignment) => Observable<Assignment>;
    isAssignmentExtendable?: (assignment: Assignment) => Observable<boolean>;
    updateAssignment?: (assignment: Assignment) => Observable<Assignment>;
    createAssignment?: (assignment: Assignment) => Observable<Assignment>;
    isViewOpen: boolean = false;
    borrowers: Borrower[] = [];
    publicationKeys: string[] = [];
    currentRecord?: Assignment;
    
    constructor(assignmentService: AssignmentService, private borrowerService: BorrowerService, private publicationService: PublicationService) {
        this.data = assignmentService.loadAllAssignments();
        this.extendAssignment = assignmentService.extendAssignment;
        this.isAssignmentExtendable = assignmentService.isAssignmentExtendable;
        this.updateAssignment = assignmentService.update;
        this.createAssignment = assignmentService.create;
    }

    ngOnInit(): void {
        this.borrowerService
            .getAll()
            .subscribe((borrowers) => (this.borrowers = borrowers));
        this.publicationService.getAll().subscribe((publications) => (this.publicationKeys = publications.map((p) => {
            return p.key ? p.key : "";
        })));
    }

    onBack(): void {
        this.currentRecord = undefined;
        this.isViewOpen = false;
    }

    onEdit(): void {
        this.isViewOpen = true;
    }

    onAdd(): void {
        this.currentRecord = undefined;
        this.isViewOpen = true;
    }

    onSelect(assignment: Assignment): void {
        this.currentRecord = assignment;
    }
}
