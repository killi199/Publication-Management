import { Component } from '@angular/core';
import { Keyword } from 'src/app/models/keyword';
import { CrudComponent } from '../CrudComponent';

@Component({
    selector: 'app-basedata-keywords',
    templateUrl: './basedata-keywords.component.html',
    styleUrls: ['./basedata-keywords.component.scss'],
})
export class BasedataKeywordsComponent extends CrudComponent<Keyword> {
    displayedColumns: string[] = ['keyword'];

    _emitCreate(record: Keyword): string {
        if (!record.value?.trim()) return 'Nothing to add!';

        this.create.emit({ value: record.value });
        return record.value + ' created!';
    }

    _emitUpdate(record: Keyword): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nothing to change!';

        this.selectedRecord!.value = record.value;
        this.update.emit(this.selectedRecord);
        return record.value + ' updated!';
    }

    _getRecordFromInputFields(): Keyword {
        const name = (<HTMLInputElement>(
            document.getElementById('input-value-of-keyword')
        )).value;
        return { value: name };
    }

    _clearInputFields(): void {
        (<HTMLInputElement>(
            document.getElementById('input-value-of-keyword')
        )).value = '';
    }
}
