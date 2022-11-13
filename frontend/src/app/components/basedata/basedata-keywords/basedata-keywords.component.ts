import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Keyword } from 'src/app/models/keyword';
import { TableInitsComponent } from '../../../helpers/table-inits';
import { CrudComponent } from '../CrudComponent';

@Component({
    selector: 'app-basedata-keywords',
    templateUrl: './basedata-keywords.component.html',
    styleUrls: ['./basedata-keywords.component.scss'],
})
export class BasedataKeywordsComponent extends CrudComponent<Keyword> {
    displayedColumns: string[] = ['keyword'];

    _emitOnCreate(record: Keyword): string {
        if (!record.value?.trim()) return 'Nothing to add!';

        this.onCreate.emit({ value: record.value });
        return record.value + ' created!';
    }

    _emitOnUpdate(record: Keyword): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nothing to change!';

        this.selectedRecord!.value = record.value;
        this.onUpdate.emit(this.selectedRecord);
        return record.value + ' updated!';
    }

    _getRecordFromInputFields(): Keyword {
        var name = (<HTMLInputElement>(
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
