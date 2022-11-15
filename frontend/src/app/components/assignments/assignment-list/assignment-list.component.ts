import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Assignment } from 'src/app/models/assignment';

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.scss'],
})
export class AssignmentListComponent extends TableInitsComponent<Assignment> {
    @Input() assignments: Observable<Assignment[]> = new Observable<
        Assignment[]
    >();

    displayedColumns: string[] = [
        'publicationKey',
        'studentnumber',
        'surname',
        'name',
        'dateOfReturn',
        'dateOfAssignment',
    ];

    ngOnInit(): void {
        this.assignments.subscribe((assignments) => {
            this.dataSource.data = assignments;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
