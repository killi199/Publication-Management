// Author: Kevin Jahrens
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Snackbar } from '../helpers/snackbar';
import { Entity } from '../models/entity';

@Injectable({
    providedIn: 'root',
})
export abstract class CrudService<T extends Entity> {
    abstract ENDPOINT_URL: string;

    constructor(private http: HttpClient, private snackBar: Snackbar) {}

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.ENDPOINT_URL).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this.handleError(err);
            })
        );
    }

    delete(value: T): Observable<any> {
        return this.http.delete(`${this.ENDPOINT_URL}/${value.uuid}`).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this.handleError(err);
            })
        );;
    }

    update(value: T): Observable<T> {
        return this.http.put<T>(this.ENDPOINT_URL, value).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this.handleError(err);
            })
        );;
    }

    create(value: T): Observable<T> {
        return this.http.post<T>(this.ENDPOINT_URL, value).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this.handleError(err);
            })
        );;
    }

    handleError(err: HttpErrorResponse): HttpErrorResponse {
        if(err.error.error) {
            this.snackBar.open('Es ist etwas schief gelaufen');
        }
        else {
            this.snackBar.open(err.error);
        }
        return err;
    }
}
