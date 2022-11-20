import { Component } from '@angular/core';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['../../../helpers/list-component.scss', '../basedata.common.scss'],
})
export class BasedataKindsComponent extends CrudComponent<KindOfPublication> {
    displayedColumns: string[] = ['kindOfPublication'];

    protected override _defineFilterPredicate(): (data: KindOfPublication, filter: string) => boolean {
        return (data: KindOfPublication, filter: string): boolean => {
            const allValuesInOneString = '' + data.value;
            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: KindOfPublication, property: string) => string {
        return (data: KindOfPublication, property: string) => {
            return data.value ?? '';
        };
    }
}
