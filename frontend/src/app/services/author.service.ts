import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from '../models/author';

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    authors: Author[];

    constructor() {
        this.authors = this.generateAllAuthors();
    }

    update(author: Author) {
        const index = this.authors.map((a) => a.uuid).indexOf(author.uuid);
        if (index !== -1) {
            this.authors.splice(index, 1);
            this.authors.splice(index, 0, author);
        }
    }

    create(author: Author) {
        this.authors.push(author);
    }

    delete(author: Author) {
        const index = this.authors.indexOf(author);
        if (index !== -1) {
            this.authors.splice(index, 1);
        }
    }

    loadAllAuthors(): Observable<Author[]> {
        return of(this.authors);
    }

    private generateAllAuthors(): Author[] {
        return [
            { uuid: '1', name: 'Fritz', surname: 'Schmidt' },
            { uuid: '2', name: 'Max', surname: 'Mustermann' },
            { uuid: '3', name: 'Hans', surname: 'Wurst' },
        ];
    }
}
