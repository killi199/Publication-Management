import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient) {
    }

    loadAllPublications(): Observable<Publication[]> {
        return this.http.get<Publication[]>('http://localhost:4200/rest/publication');
    }
}
