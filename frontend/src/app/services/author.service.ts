// Author: Kevin Jahrens
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Snackbar } from '../helpers/snackbar';
import { Author } from '../models/author';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorService extends CrudService<Author> {
    ENDPOINT_URL = '/rest/author';

    constructor(http: HttpClient, snackBar: Snackbar) {
        super(http, snackBar);
    }
}
