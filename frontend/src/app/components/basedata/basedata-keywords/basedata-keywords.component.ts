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
        if (!record.value?.trim()) return 'Nothing to add!';

        this.create!(record).subscribe((a) => {
            this.dataSource.data.push(a);
        });

        return record.value + ' created!';
    }

    override _emitUpdate(record: Keyword): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nothing to change!';

        this.update!(record).subscribe((a) => {
            this.selectedRecord!.value = a.value;
            this.selectedRecord = undefined;
            this.selection.clear();
        });

        return record.value + ' updated!';
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
}
