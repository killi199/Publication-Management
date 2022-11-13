import { Component } from '@angular/core';
import { Borrower } from 'src/app/models/borrower';
import { CrudComponent } from '../CrudComponent';

@Component({
    selector: 'app-basedata-borrowers',
    templateUrl: './basedata-borrowers.component.html',
    styleUrls: ['./basedata-borrowers.component.scss'],
})
export class BasedataBorrowersComponent extends CrudComponent<Borrower> {
    displayedColumns: string[] = ['surname', 'name', 'studentnumber'];

    _emitCreate(record: Borrower): string {
        if (
            !record.name?.trim() ||
            !record.surname?.trim() ||
            !record.studentnumber?.trim()
        )
            return 'Nothing to add!';

        this.create.emit({
            surname: record.surname,
            name: record.name,
            studentnumber: record.studentnumber,
        });
        return 'Borrower created!';
    }
    _emitUpdate(record: Borrower): string {
        if (
            this.selectedRecord?.name === record.name &&
            this.selectedRecord?.surname === record.surname &&
            this.selectedRecord?.studentnumber === record.studentnumber
        )
            return 'Nothing to change!';

        this.selectedRecord!.surname = record.surname;
        this.selectedRecord!.name = record.name;
        this.selectedRecord!.studentnumber = record.studentnumber;
        this.update.emit(this.selectedRecord);
        this.selectedRecord = undefined;
        this.selection.clear();
        return 'Borrower updated!';
    }

    _getRecordFromInputFields(): Borrower {
        const surname = (<HTMLInputElement>(
            document.getElementById('input-surname')
        )).value;
        const name = (<HTMLInputElement>document.getElementById('input-name'))
            .value;
        const studentnumber = (<HTMLInputElement>(
            document.getElementById('input-studentnumber')
        )).value;
        return { surname: surname, name: name, studentnumber: studentnumber };
    }

    _clearInputFields(): void {
        (<HTMLInputElement>document.getElementById('input-surname')).value = '';
        (<HTMLInputElement>document.getElementById('input-name')).value = '';
        (<HTMLInputElement>(
            document.getElementById('input-studentnumber')
        )).value = '';
    }
}
