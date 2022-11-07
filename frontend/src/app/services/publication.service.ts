import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publication } from '../models/publication';

@Injectable({
    providedIn: 'root',
})
export class PublicationService {


    constructor(private http: HttpClient) {
    }

    loadAllPublications(): Observable<Publication[]> {
        return this.http.get<Publication[]>('http://localhost:4200/rest/publication');
    }
}
