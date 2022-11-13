import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
