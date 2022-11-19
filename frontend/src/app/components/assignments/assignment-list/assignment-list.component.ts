import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Assignment } from 'src/app/models/assignment';

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class AssignmentListComponent extends TableInitsComponent<Assignment> implements OnInit {
    @Input() assignments: Observable<Assignment[]> = new Observable<Assignment[]>();

    @Output() showAssignment = new EventEmitter<Assignment>();

    displayedColumns: string[] = [
        'publicationKey',
        'surname',
        'name',
        'studentNumber',
        'dateOfAssignment',
        'dateOfReturn',
    ];

    selectedAssignment?: Assignment;

    ngOnInit(): void {
        this.assignments.subscribe((assignments) => {
            this.dataSource.data = assignments;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    onShowAssignment(assignment: Assignment): void {
        if (assignment === this.selectedAssignment) {
            this.showAssignment.emit(undefined);
            this.selectedAssignment = undefined;
        } else {
            this.showAssignment.emit(assignment);
            this.selectedAssignment = assignment;
        }
    }

    protected _defineFilterPredicate(): (data: Assignment, filter: string) => boolean {
        // TODO: 2 Dates fehlen, brauche hier das short-date format
        return (data: Assignment, filter: string): boolean => {
            const allValuesInOneString =
                '' + data.publication?.key + data.borrower?.studentNumber + data.borrower?.name + data.borrower?.surname;
            return allValuesInOneString?.trim().toLowerCase().includes(filter) ?? false;
        };
    }
}
