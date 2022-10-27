import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';

const PUBLICATION: Publication = {
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

const PUBLICATIONS: Publication[] = [PUBLICATION, PUBLICATION, PUBLICATION];

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent {
    publications: Publication[] = PUBLICATIONS;
    currentPublication?: Publication;

    constructor() {}

    onShowPublication(publication: Publication): void {
        this.currentPublication = publication;
    }
}
