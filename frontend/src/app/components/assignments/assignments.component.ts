import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Borrower } from 'src/app/models/borrower';
import { Publication } from 'src/app/models/publication';
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
    isViewOpen: boolean = false;
    borrowers: Borrower[] = [];
    publications: Publication[] = [];
    currentRecord?: Assignment;    
    viewSpecification: string = "";
    showHistory: boolean = false;

    constructor(
        private assignmentService: AssignmentService,
        private borrowerService: BorrowerService,
        private publicationService: PublicationService
    ) {
        this.data = assignmentService.getAll();
    }

    extend = (uuid: string): Observable<any> => {
        return this.assignmentService.extend(uuid);
    };

    returnAssignment = (uuid: string): Observable<Assignment> => {
        return this.assignmentService.return(uuid);
    };

    createAssignment = (assignment: Assignment): Observable<Assignment> => {
        return this.assignmentService.create(assignment);
    };

    ngOnInit(): void {
        this.borrowerService.getAll().subscribe((borrowers) => (this.borrowers = borrowers));
        this.publicationService.getAll().subscribe((publications) => (this.publications = publications));
    }

    onBack(): void {
        this.viewSpecification = "";
        this.currentRecord = undefined;
        this.isViewOpen = false;
    }

    onEdit(): void {
        this.viewSpecification = "bearbeiten";
        this.isViewOpen = true;
    }

    onAdd(): void {
        this.viewSpecification = "hinzufügen";
        this.currentRecord = undefined;
        this.isViewOpen = true;
    }

    onSelect(assignment: Assignment): void {
        this.currentRecord = assignment;
    }

    changeShowHistory(): void {
        this.showHistory = !this.showHistory;
        console.log(this.showHistory);
    }
}
