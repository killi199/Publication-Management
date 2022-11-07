import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publication } from '../models/publication';

@Injectable({
    providedIn: 'root',
})
export class PublicationService {
    pubs?: Publication[];

    constructor(private http: HttpClient) {
    }

    loadAllPublications(): Observable<Publication[]> {
        return this.http.get<Publication[]>('http://localhost:4200/rest/publication');
    }

    deletePublication(publication: Publication): void {
        console.log('deletePublication', publication);
        if (publication) {
            this.pubs = this.pubs?.filter((pub) => pub.key !== publication.key);
        }
    }

    savePublication(publication: Publication): void {
        console.log('savePublication', publication);
    }
}
