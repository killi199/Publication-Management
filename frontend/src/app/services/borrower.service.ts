import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Borrower } from '../models/borrower';

@Injectable({
    providedIn: 'root',
})
export class BorrowerService {
    borrowers: Borrower[];

    constructor() {
        this.borrowers = this.generateAllBorrowers();
    }

    loadAllBorrowers(): Observable<Borrower[]> {
        return of(this.borrowers);
    }

    update(borrower: Borrower) {
        const index = this.borrowers.map((b) => b.uuid).indexOf(borrower.uuid);
        if (index !== -1) {
            this.borrowers.splice(index, 1);
            this.borrowers.splice(index, 0, borrower);
        }
    }
    create(borrower: Borrower) {
        this.borrowers.push(borrower);
    }
    delete(borrower: Borrower) {
        const index = this.borrowers.indexOf(borrower);
        if (index !== -1) {
            this.borrowers.splice(index, 1);
        }
    }

    private generateAllBorrowers(): Borrower[] {
        return [
            {
                name: 'Schmidt',
                surname: 'Max',
                studentnumber: '4444',
                uuid: '1',
            },
            { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
            {
                name: 'Schmidt',
                surname: 'Max',
                studentnumber: '4444',
                uuid: '1',
            },
            { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
            {
                name: 'Schmidt',
                surname: 'Max',
                studentnumber: '4444',
                uuid: '1',
            },
            { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
            {
                name: 'Schmidt',
                surname: 'Max',
                studentnumber: '4444',
                uuid: '1',
            },
            { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
            {
                name: 'Schmidt',
                surname: 'Max',
                studentnumber: '4444',
                uuid: '1',
            },
            { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
            {
                name: 'Schmidt',
                surname: 'Max',
                studentnumber: '4444',
                uuid: '1',
            },
            { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
        ];
    }
}
