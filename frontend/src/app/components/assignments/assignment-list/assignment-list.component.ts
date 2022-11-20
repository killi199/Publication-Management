import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GermanDateAdapter } from 'src/app/helpers/german-date-adapter';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Assignment } from 'src/app/models/assignment';

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class AssignmentListComponent extends TableInitsComponent<Assignment> implements OnInit {
    @Input()
    assignments: Observable<Assignment[]> = new Observable<Assignment[]>();

    @Output()
    showAssignment = new EventEmitter<Assignment>();

    displayedColumns: string[] = [
        'publicationKey',
        'studentNumber',
        'surname',
        'name',
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
        return (data: Assignment, filter: string): boolean => {
            const dateOfAssignment = data.dateOfAssignment;
            const dateOfAssignmentShort = this._convertDate(dateOfAssignment);
            const dateOfReturn = data.dateOfReturn;
            const dateOfReturnShort = this._convertDate(dateOfReturn);
            const allValuesInOneString =
                '' +
                data.publicationKey +
                data.borrower.studentNumber +
                data.borrower.name +
                data.borrower.surname +
                dateOfAssignmentShort +
                dateOfReturnShort;
            return allValuesInOneString?.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: Assignment, property: string) => string {
        return (data: Assignment, property: string) => {
            switch (property) {
                case 'publicationKey': {
                    return data.publicationKey;
                }
                case 'studentNumber': {
                    return data.borrower.studentNumber;
                }
                case 'surname': {
                    return data.borrower.surname;
                }
                case 'name': {
                    return data.borrower.name;
                }
                case 'dateOfAssignment': {
                    return data.dateOfAssignment.toString();
                }
                case 'dateOfReturn': {
                    return data.dateOfReturn.toString();
                }
                default: {
                    return '';
                }
            }
        };
    }

    private _convertDate(date: Date): string {
        return new GermanDateAdapter().formatDateToShortString(date);
    }
}
