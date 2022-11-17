import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Borrower } from '../models/borrower';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class BorrowerService extends CrudService<Borrower> {
    ENDPOINT_URL = '/rest/borrower';

    constructor(http: HttpClient) {
        super(http);
    }
}
