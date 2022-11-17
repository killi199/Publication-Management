import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';

@Injectable({
    providedIn: 'root',
})
export abstract class CrudService<T extends Entity> {
    abstract ENDPOINT_URL: string;

    constructor(private http: HttpClient) {}

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.ENDPOINT_URL);
    }

    delete(value: T): Observable<any> {
        return this.http.delete(`${this.ENDPOINT_URL}/${value.uuid}`);
    }

    update(value: T): Observable<T> {
        return this.http.put<T>(this.ENDPOINT_URL, value);
    }

    create(value: T): Observable<T> {
        return this.http.post<T>(this.ENDPOINT_URL, value);
    }
}
