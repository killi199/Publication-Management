import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Snackbar } from '../helpers/snackbar';
import { Publication } from '../models/publication';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class PublicationService extends CrudService<Publication> {
    ENDPOINT_URL: string = '/rest/publication';
    private httpintern: HttpClient;

    constructor(http: HttpClient, snackBar: Snackbar) {
        super(http, snackBar);
        this.httpintern = http;
    }

    override delete(value: Publication): Observable<any> {
        return this.httpintern.delete(`${this.ENDPOINT_URL}/${value.key}`).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this.handleError(err);
            })
        );;
    }
}
