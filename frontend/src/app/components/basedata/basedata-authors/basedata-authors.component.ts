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
            return 'Nothing to add!';

        this.create.emit({
            surname: record.surname,
            name: record.name,
        });
        return 'Author created!';
    }

    override _emitUpdate(record: Author): string {
        if (
            this.selectedRecord?.name === record.name &&
            this.selectedRecord?.surname === record.surname
        )
            return 'Nothing to change!';

        this.selectedRecord!.surname = record.surname;
        this.selectedRecord!.name = record.name;
        this.update.emit(this.selectedRecord);
        this.selectedRecord = undefined;
        this.selection.clear();
        return 'Author updated!';
    }

    override _getRecordFromInputFields(): Author {
        const surname = (<HTMLInputElement>(
            document.getElementById('input-surname')
        )).value;
        const name = (<HTMLInputElement>document.getElementById('input-name'))
            .value;
        return { surname: surname, name: name };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>document.getElementById('input-surname')).value = '';
        (<HTMLInputElement>document.getElementById('input-name')).value = '';
    }
}
