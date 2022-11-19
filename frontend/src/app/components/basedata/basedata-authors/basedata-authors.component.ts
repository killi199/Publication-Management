import { Component } from '@angular/core';
import { Author } from 'src/app/models/author';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-authors',
    templateUrl: './basedata-authors.component.html',
    styleUrls: ['../basedata.common.scss'],
})
export class BasedataAuthorsComponent extends CrudComponent<Author> {
    displayedColumns: string[] = ['surname', 'name'];

    override _emitCreate(record: Author): string {
        if (!record.name?.trim() || !record.surname?.trim())
            return 'Nichts zum Hinzufügen!';

        this.create!(record).subscribe((a) => {
            this.dataSource.data.push(a);
            this.dataSource.data = this.dataSource.data;
        });

        return 'Autor erstellt!';
    }

    override _emitUpdate(record: Author): string {
        if (
            this.selectedRecord?.name === record.name &&
            this.selectedRecord?.surname === record.surname
        )
            return 'Nichts zum Ändern!';

        this.update!(record).subscribe((a) => {
            this.selectedRecord!.name = a.name;
            this.selectedRecord!.surname = a.surname;
            this.selectedRecord = undefined;
            this.selection.clear();
        });

        return 'Autor geändert!';
    }

    override _getRecordFromInputFields(): Author {
        const surname = (<HTMLInputElement>(
            document.getElementById('input-surname')
        )).value;
        const name = (<HTMLInputElement>document.getElementById('input-name'))
            .value;
        return {
            uuid: this.selectedRecord?.uuid,
            surname: surname,
            name: name,
        };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>document.getElementById('input-surname')).value = '';
        (<HTMLInputElement>document.getElementById('input-name')).value = '';
    }

    protected override _defineFilterPredicate(): (data: Author, filter: string) => boolean {
        return (data: Author, filter: string): boolean => {
            const allValuesInOneString = '' + data.surname + data.name;
            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }
}
