import { Component } from '@angular/core';
import { Borrower } from 'src/app/models/borrower';
import { CrudComponent } from '../../../helpers/crud-component';

@Component({
    selector: 'app-basedata-borrowers',
    templateUrl: './basedata-borrowers.component.html',
    styleUrls: ['../basedata.common.scss'],
})
export class BasedataBorrowersComponent extends CrudComponent<Borrower> {
    displayedColumns: string[] = ['surname', 'name', 'studentNumber'];

    override _emitCreate(record: Borrower): string {
        if (
            !record.name?.trim() ||
            !record.surname?.trim() ||
            !record.studentNumber?.trim()
        )
            return 'Nothing to add!';

        this.create!(record).subscribe((a) => {
            this.dataSource.data.push(a);
            this.dataSource.data = this.dataSource.data;
        });
        return 'Borrower created!';
    }
    override _emitUpdate(record: Borrower): string {
        if (
            this.selectedRecord?.name === record.name &&
            this.selectedRecord?.surname === record.surname &&
            this.selectedRecord?.studentNumber === record.studentNumber
        )
            return 'Nothing to change!';

        this.update!(record).subscribe((a) => {
            this.selectedRecord!.surname = a.surname;
            this.selectedRecord!.name = a.name;
            this.selectedRecord!.studentNumber = a.studentNumber;
            this.selectedRecord = undefined;
            this.selection.clear();
        });

        return 'Borrower updated!';
    }

    override _getRecordFromInputFields(): Borrower {
        const surname = (<HTMLInputElement>(
            document.getElementById('input-surname')
        )).value;
        const name = (<HTMLInputElement>document.getElementById('input-name'))
            .value;
        const studentNumber = (<HTMLInputElement>(
            document.getElementById('input-studentNumber')
        )).value;
        return {
            uuid: this.selectedRecord?.uuid,
            surname: surname,
            name: name,
            studentNumber: studentNumber,
        };
    }

    override _clearInputFields(): void {
        (<HTMLInputElement>document.getElementById('input-surname')).value = '';
        (<HTMLInputElement>document.getElementById('input-name')).value = '';
        (<HTMLInputElement>(
            document.getElementById('input-studentNumber')
        )).value = '';
    }
}
