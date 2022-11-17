import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class PublicationService extends CrudService<Publication> {
    ENDPOINT_URL: string = '/rest/publication';
    private httpintern: HttpClient;

    constructor(http: HttpClient) {
        super(http);
        this.httpintern = http;
    }

    override delete(value: Publication): Observable<any> {
        return this.httpintern.delete(`${this.ENDPOINT_URL}/${value.key}`);
    }
}
