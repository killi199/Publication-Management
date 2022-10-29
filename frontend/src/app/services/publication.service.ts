import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publication } from '../models/publication';

const PUBLICATION1: Publication = {
    key: '1234',
    authors: [
        { uuid: '21234', name: 'Müller', surname: 'Hans' },
        { uuid: '3111', name: 'Schmidt', surname: 'Fritz' },
    ],
    isbn: '34567890',
    dateOfPublication: new Date('2022-10-27'),
    keywords: [
        { uuid: '5678', value: 'Java' },
        { uuid: '5679', value: 'IT' },
    ],
    kindOfPublication: { uuid: '567', value: 'Sachbuch' },
    publisher: "O'Reilly",
    quantity: 2,
    title: 'Java SuperBook',
};

const PUBLICATION2: Publication = {
    key: '3214',
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

const PUBLICATIONS: Publication[] = [PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2,
    PUBLICATION1, PUBLICATION2, PUBLICATION2];

@Injectable({
    providedIn: 'root',
})
export class PublicationService {
    loadAllPublications(): Observable<Publication[]> {
        return of(PUBLICATIONS);
    }
}
