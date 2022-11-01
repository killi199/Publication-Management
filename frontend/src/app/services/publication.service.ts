import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

    deletePublication(publication: Publication | undefined): void {
        console.log('deletePublication', publication);
        if (publication) {
            this.pubs = this.pubs.filter((pub) => pub.key !== publication.key);
        }
    }

    savePublication(publication: Publication | undefined): void {
        console.log('savePublication', publication);
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
