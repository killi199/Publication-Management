import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Keyword } from '../models/keyword';

@Injectable({
    providedIn: 'root',
})
export class KeywordService {
    keywords: Keyword[];

    constructor() {
        this.keywords = this.generateAllKeywords();
    }

    loadAllKeywords(): Observable<Keyword[]> {
        return of(this.keywords);
    }

    update(keyword: Keyword) {
        const index = this.keywords.map((k) => k.uuid).indexOf(keyword.uuid);
        if (index !== -1) {
            this.keywords.splice(index, 1);
            this.keywords.splice(index, 0, keyword);
        }
    }
    create(keyword: Keyword) {
        this.keywords.push(keyword);
    }
    delete(keyword: Keyword) {
        const index = this.keywords.indexOf(keyword);
        if (index !== -1) {
            this.keywords.splice(index, 1);
        }
    }

    private generateAllKeywords(): Keyword[] {
        let test1 = new Keyword('1', 'Test1');
        let test2 = new Keyword('2', 'Test2');
        let test3 = new Keyword('5678', 'Python');
        let test4 = new Keyword('5679', 'IT');
        return [test1, test2, test3, test4];
    }
}
