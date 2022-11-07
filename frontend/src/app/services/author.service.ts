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

    loadAllAuthors(): Observable<Author[]> {
        return of(this.authors);
    }

    private generateAllAuthors(): Author[] {
        let test1 = new Author('3111', 'Fritz', 'Schmidt');
        let test2 = new Author('3112', 'Max', 'Mustermann');
        let test3 = new Author('3113', 'Hans', 'Wurst');
        return [test1, test2, test3];
    }
}
