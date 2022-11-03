import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from '../models/author';
import { Borrower } from '../models/borrower';
import { Keyword } from '../models/keyword';
import { KindOfPublication } from '../models/kind-of-publication';
import { Publication } from '../models/publication';

@Injectable({
    providedIn: 'root',
})
export class PublicationService {
    pubs: Publication[];

    constructor() {
        this.pubs = this.generateAllPubs(100);
    }

    loadAllPublications(): Observable<Publication[]> {
        return of(this.pubs);
    }

    loadKindOfPublications(): Observable<KindOfPublication[]> {
        return of([
            { uuid: '1', value: 'Sachbuch' },
            { uuid: '2', value: 'Fachbuch' },
            { uuid: '3', value: 'Hausarbeit' },
            { uuid: '4', value: 'Bachelor' },
            { uuid: '1', value: 'Sachbuch' },
            { uuid: '2', value: 'Fachbuch' },
            { uuid: '3', value: 'Hausarbeit' },
            { uuid: '4', value: 'Bachelor' },
            { uuid: '1', value: 'Sachbuch' },
            { uuid: '2', value: 'Fachbuch' },
            { uuid: '3', value: 'Hausarbeit' },
            { uuid: '4', value: 'Bachelor' },
            { uuid: '1', value: 'Sachbuch' },
            { uuid: '2', value: 'Fachbuch' },
            { uuid: '3', value: 'Hausarbeit' },
            { uuid: '4', value: 'Bachelor' },
            { uuid: '1', value: 'Sachbuch' },
            { uuid: '2', value: 'Fachbuch' },
            { uuid: '3', value: 'Hausarbeit' },
            { uuid: '4', value: 'Bachelor' },
        ]);
    }

    loadAuthors(): Observable<Borrower[]> {
        return of([
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
        ]);
    }

    loadBorrowers(): Observable<Author[]> {
        return of([
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
            { name: 'Schmidt', surname: 'Max', uuid: '1' },
            { name: 'Hmidt', surname: 'Fax', uuid: '2' },
            { name: 'Chmidt', surname: 'Tax', uuid: '3' },
        ]);
    }
    loadKeywords(): Observable<Keyword[]> {
        return of([
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
            { uuid: '1', value: 'Java' },
            { uuid: '2', value: 'Python' },
            { uuid: '3', value: 'IT' },
            { uuid: '4', value: 'BWL' },
        ]);
    }

    // TMP HELPER
    private createPublication(key: string): Publication {
        return {
            key: key,
            authors: [{ uuid: '3111', name: 'Schmidt', surname: 'Fritz' }],
            isbn: '66653',
            dateOfPublication: new Date('2021-02-17'),
            keywords: [
                { uuid: '5678', value: 'Python' },
                { uuid: '5679', value: 'IT' },
            ],
            kindOfPublication: { uuid: '567', value: 'Sachbuch' },
            publisher: "O'Reilly",
            quantity: 1,
            title: 'Python SuperBook',
        };
    }

    // TMP HELPER
    private generateAllPubs(amount: number): Publication[] {
        let pubs = [];
        for (let i = 1; i <= amount; i++) {
            pubs.push(this.createPublication(i.toString()));
        }
        return pubs;
    }
}
