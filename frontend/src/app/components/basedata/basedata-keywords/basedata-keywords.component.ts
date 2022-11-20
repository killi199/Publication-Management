import { Component } from '@angular/core';
import { Keyword } from 'src/app/models/keyword';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-keywords',
    templateUrl: './basedata-keywords.component.html',
    styleUrls: ['../../../helpers/list-component.scss', '../basedata.common.scss'],
})
export class BasedataKeywordsComponent extends CrudComponent<Keyword> {
    displayedColumns: string[] = ['keyword'];

    protected override _defineFilterPredicate(): (data: Keyword, filter: string) => boolean {
        return (data: Keyword, filter: string): boolean => {
            const allValuesInOneString = '' + data.value;
            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }
}
