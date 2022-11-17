import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from '../models/author';

const ENDPOINT_URL = '/rest/author';

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    constructor(private http: HttpClient) {}

    listAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(ENDPOINT_URL);
    }

    deleteAuthor(author: Author): Observable<any> {
        return this.http.delete(`${ENDPOINT_URL}/${author.uuid}`);
    }

    updateAuthor(author: Author): Observable<any> {
        return this.http.put(ENDPOINT_URL, author);
    }

    saveAuthor(author: Author): Observable<any> {
        return this.http.post(ENDPOINT_URL, author);
    }
}
