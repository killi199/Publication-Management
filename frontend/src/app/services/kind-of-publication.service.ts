import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KindOfPublication } from '../models/kind-of-publication';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class KindOfPublicationService extends CrudService<KindOfPublication> {
    ENDPOINT_URL = '/rest/kind-of-publication';

    constructor(http: HttpClient) {
        super(http);
    }
}
