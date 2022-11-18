import { Component } from '@angular/core';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['../basedata.common.scss'],
})
export class BasedataKindsComponent extends CrudComponent<KindOfPublication> {
    displayedColumns: string[] = ['kindOfPublication'];

    override _emitCreate(record: KindOfPublication): string {
        if (!record.value?.trim()) return 'Nichts zum Hinzufügen!';

        this.create!(record).subscribe((a) => {
            this.dataSource.data.push(a);
            this.dataSource.data = this.dataSource.data;
        });

        return 'Art der Publikation erstellt!';
    }

    override _emitUpdate(record: KindOfPublication): string {
        if (this.selectedRecord?.value === record.value)
            return 'Nichts zum Ändern!';

        this.update!(record).subscribe((a) => {
            this.selectedRecord!.value = a.value;
            this.selectedRecord = undefined;
            this.selection.clear();
        });

        return 'Art der Publikation geändert!';
    }

    override _getRecordFromInputFields(): KindOfPublication {
        var name = (<HTMLInputElement>(
            document.getElementById('input-value-of-pub')
        )).value;
        return { uuid: this.selectedRecord?.uuid, value: name };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>(
            document.getElementById('input-value-of-pub')
        )).value = '';
    }
}
