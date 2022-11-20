import { Component } from '@angular/core';
import { Author } from 'src/app/models/author';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-authors',
    templateUrl: './basedata-authors.component.html',
    styleUrls: ['../../../helpers/list-component.scss', '../basedata.common.scss'],
})
export class BasedataAuthorsComponent extends CrudComponent<Author> {
    displayedColumns: string[] = ['surname', 'name'];

    protected override _defineFilterPredicate(): (data: Author, filter: string) => boolean {
        return (data: Author, filter: string): boolean => {
            const allValuesInOneString = '' + data.surname + data.name;
            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: Author, property: string) => string {
        return (data: Author, property: string) => {
            switch (property) {
                case 'surname': {
                    return data.surname ?? '';
                }
                case 'name': {
                    return data.name ?? '';
                }
                default: {
                    return '';
                }
            }
        };
    }
}
