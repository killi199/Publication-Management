import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from '../models/author';
import { Borrower } from '../models/borrower';
import { Keyword } from '../models/keyword';
import { KindOfPublication } from '../models/kind-of-publication';
import { Publication } from '../models/publication';

const ENDPOINT_URL = '/rest/publication';

@Injectable({
    providedIn: 'root',
})
export class PublicationService {
    constructor(private http: HttpClient) {
    }

    listAllPublications(): Observable<Publication[]> {
        return this.http.get<Publication[]>(ENDPOINT_URL);
    }

    deletePublication(publication: Publication): Observable<any> {
        return this.http.delete(`${ENDPOINT_URL}/${publication.key}`);
    }

    updatePublication(publication: Publication): Observable<any> {
        return this.http.put(ENDPOINT_URL, publication);
    }

    savePublication(publication: Publication): Observable<any> {
        return this.http.post(ENDPOINT_URL, publication);
    }


    authors: Author[] = [
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
    ]
    loadAuthors(): Observable<Author[]> {
        return of(this.authors);
    }   
}
