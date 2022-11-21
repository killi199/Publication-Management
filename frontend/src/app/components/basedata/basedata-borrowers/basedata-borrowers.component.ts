// Author: Marcel Dymarz
import { Component } from '@angular/core';
import { Borrower } from 'src/app/models/borrower';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-borrowers',
    templateUrl: './basedata-borrowers.component.html',
    styleUrls: ['../../../helpers/list-component.scss', '../basedata.common.scss'],
})
export class BasedataBorrowersComponent extends CrudComponent<Borrower> {
    displayedColumns: string[] = ['surname', 'name', 'studentNumber'];

    protected override _defineFilterPredicate(): (data: Borrower, filter: string) => boolean {
        return (data: Borrower, filter: string): boolean => {
            const allValuesInOneString = '' + data.name + data.surname + data.studentNumber;
            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: Borrower, property: string) => string {
        return (data: Borrower, property: string) => {
            switch (property) {
                case 'studentNumber': {
                    return data.studentNumber;
                }
                case 'surname': {
                    return data.surname;
                }
                case 'name': {
                    return data.name;
                }
                default: {
                    return '';
                }
            }
        };
    }
}
