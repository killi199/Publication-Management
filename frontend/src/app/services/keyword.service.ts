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
        return [
            { uuid: '1', value: 'Code' },
            { uuid: '2', value: 'C#' },
        ];
    }
}
