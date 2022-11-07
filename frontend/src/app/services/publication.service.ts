import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publication } from '../models/publication';

@Injectable({
    providedIn: 'root',
})
export class PublicationService {
    pubs: Publication[];

    constructor(private http: HttpClient) {
    }

    loadAllPublications(): Observable<Publication[]> {
        return this.http.get<Publication[]>('http://localhost:4200/rest/publication');
    }

    deletePublication(publication: Publication): void {
        console.log('deletePublication', publication);
        if (publication) {
            this.pubs = this.pubs.filter((pub) => pub.key !== publication.key);
        }
    }

    savePublication(publication: Publication): void {
        console.log('savePublication', publication);
    }

    // TMP HELPER
    private createPublication(key: string): Publication {
        return new Publication(
            key,
            'Python SuperBook',
            [{ uuid: '3111', name: 'Schmidt', surname: 'Fritz' }],
            new Date('2021-02-17'),
            "O'Reilly",
            { uuid: '567', value: 'Sachbuch' },
            '66653',
            [
                { uuid: '5678', value: 'Python' },
                { uuid: '5679', value: 'IT' },
            ],
            1
        );
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
