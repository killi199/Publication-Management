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

    private generateAllKeywords(): Keyword[] {
        let test1 = new Keyword('1', 'Test1');
        let test2 = new Keyword('2', 'Test2');
        let test3 = new Keyword('3', 'Python');
        let test4 = new Keyword('4', 'IT');
        return [test1, test2, test3, test4];
    }
}
