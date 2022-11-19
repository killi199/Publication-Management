import { Component } from '@angular/core';
import { Keyword } from 'src/app/models/keyword';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-keywords',
    templateUrl: './basedata-keywords.component.html',
    styleUrls: ['../basedata.common.scss'],
})
export class BasedataKeywordsComponent extends CrudComponent<Keyword> {
    displayedColumns: string[] = ['keyword'];

    override _emitCreate(record: Keyword): string {
        if (!record.value?.trim()) return 'Nichts zum Hinzufügen!';

        this.create!(record).subscribe((a) => {
            this.dataSource.data.push(a);
            this.dataSource.data = this.dataSource.data;
        });

        return 'Schlagwort erstellt!';
    }

    override _emitUpdate(record: Keyword): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nichts zum Ändern!';

        this.update!(record).subscribe((a) => {
            this.selectedRecord!.value = a.value;
            this.selectedRecord = undefined;
            this.selection.clear();
        });

        return 'Schlagwort geändert!';
    }

    override _getRecordFromInputFields(): Keyword {
        const name = (<HTMLInputElement>(
            document.getElementById('input-value-of-keyword')
        )).value;
        return { uuid: this.selectedRecord?.uuid, value: name };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>(
            document.getElementById('input-value-of-keyword')
        )).value = '';
    }

    protected override _defineFilterPredicate(): (data: Keyword, filter: string) => boolean {
        return (data: Keyword, filter: string): boolean => {
            const allValuesInOneString = '';

            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }
}
