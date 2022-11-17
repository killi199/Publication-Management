import { Component } from '@angular/core';
import { Keyword } from 'src/app/models/keyword';
import { CrudComponent } from '../../../helpers/CrudComponent';

@Component({
    selector: 'app-basedata-keywords',
    templateUrl: './basedata-keywords.component.html',
    styleUrls: ['../basedata.common.scss'],
})
export class BasedataKeywordsComponent extends CrudComponent<Keyword> {
    displayedColumns: string[] = ['keyword'];

    override _emitCreate(record: Keyword): string {
        if (!record.value?.trim()) return 'Nothing to add!';

        //this.create.emit({ value: record.value });
        return record.value + ' created!';
    }

    override _emitUpdate(record: Keyword): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nothing to change!';

        this.selectedRecord!.value = record.value;
        this.update.emit(this.selectedRecord);
        return record.value + ' updated!';
    }

    override _getRecordFromInputFields(): Keyword {
        const name = (<HTMLInputElement>(
            document.getElementById('input-value-of-keyword')
        )).value;
        return { value: name };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>(
            document.getElementById('input-value-of-keyword')
        )).value = '';
    }
}
