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

    kindOfPublications: KindOfPublication[] = [
        { uuid: '1', value: 'Sachbuch' },
        { uuid: '2', value: 'Fachbuch' },
        { uuid: '3', value: 'Hausarbeit' },
        { uuid: '4', value: 'Bachelor' },
        { uuid: '1', value: 'Sachbuch' },
        { uuid: '2', value: 'Fachbuch' },
        { uuid: '3', value: 'Hausarbeit' },
        { uuid: '4', value: 'Bachelor' },
        { uuid: '1', value: 'Sachbuch' },
        { uuid: '2', value: 'Fachbuch' },
        { uuid: '3', value: 'Hausarbeit' },
        { uuid: '4', value: 'Bachelor' },
        { uuid: '1', value: 'Sachbuch' },
        { uuid: '2', value: 'Fachbuch' },
        { uuid: '3', value: 'Hausarbeit' },
    ]
    loadKindOfPublications(): Observable<KindOfPublication[]> {
        return of(this.kindOfPublications);
    }
    
    deleteKindOfPublication(kindOfPublication: KindOfPublication) {
        const index = this.kindOfPublications.indexOf(kindOfPublication);
        if (index !== -1){
            this.kindOfPublications.splice(index, 1);
        }
    }

    borrowers: Borrower[] = [
        {
            name: 'Schmidt',
            surname: 'Max',
            studentnumber: '4444',
            uuid: '1',
        },
        { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
        { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
        {
            name: 'Schmidt',
            surname: 'Max',
            studentnumber: '4444',
            uuid: '1',
        },
        { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
        { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
        {
            name: 'Schmidt',
            surname: 'Max',
            studentnumber: '4444',
            uuid: '1',
        },
        { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
        { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
        {
            name: 'Schmidt',
            surname: 'Max',
            studentnumber: '4444',
            uuid: '1',
        },
        { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
        { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
        {
            name: 'Schmidt',
            surname: 'Max',
            studentnumber: '4444',
            uuid: '1',
        },
        { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
        { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
        {
            name: 'Schmidt',
            surname: 'Max',
            studentnumber: '4444',
            uuid: '1',
        },
        { name: 'Hmidt', surname: 'Fax', studentnumber: '1444', uuid: '2' },
        { name: 'Chmidt', surname: 'Tax', studentnumber: '544', uuid: '3' },
    ]
    loadBorrowers(): Observable<Borrower[]> {
        return of(this.borrowers);
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

    keywords: Keyword[] = [
        { uuid: '1', value: 'Java' },
        { uuid: '2', value: 'Python' },
        { uuid: '3', value: 'IT' },
        { uuid: '4', value: 'BWL' },
        { uuid: '1', value: 'Java' },
        { uuid: '2', value: 'Python' },
        { uuid: '3', value: 'IT' },
        { uuid: '4', value: 'BWL' },
        { uuid: '1', value: 'Java' },
        { uuid: '2', value: 'Python' },
        { uuid: '3', value: 'IT' },
        { uuid: '4', value: 'BWL' },
        { uuid: '1', value: 'Java' },
        { uuid: '2', value: 'Python' },
        { uuid: '3', value: 'IT' },
        { uuid: '4', value: 'BWL' },
        { uuid: '1', value: 'Java' },
        { uuid: '2', value: 'Python' },
        { uuid: '3', value: 'IT' },
        { uuid: '4', value: 'BWL' },
        { uuid: '1', value: 'Java' }
    ]
    loadKeywords(): Observable<Keyword[]> {
        return of(this.keywords);
    }

}
