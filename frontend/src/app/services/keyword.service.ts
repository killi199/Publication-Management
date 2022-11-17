import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Keyword } from '../models/keyword';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class KeywordService extends CrudService<Keyword> {
    ENDPOINT_URL = '/rest/keyword';

    constructor(http: HttpClient) {
        super(http);
    }
}
