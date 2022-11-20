import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Snackbar } from '../helpers/snackbar';
import { Assignment } from '../models/assignment';

const ENDPOINT_URL: string = '/rest/assignment';

@Injectable({
    providedIn: 'root',
})
export class AssignmentService {
    constructor(private snackBar: Snackbar, private http: HttpClient) {}

    getAll(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(ENDPOINT_URL).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    create(assignment: Assignment): Observable<Assignment> {
        return this.http.post<Assignment>(ENDPOINT_URL, assignment).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    getAllByPubKey(uuid: string): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(`${ENDPOINT_URL}/${uuid}`).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    returnAssignment(uuid: string): Observable<Assignment> {
        return this.http.post<Assignment>(`${ENDPOINT_URL}/return/${uuid}`, null).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    extend(uuid: string): Observable<Assignment> {
        return this.http.post<Assignment>(`${ENDPOINT_URL}/extend/${uuid}`, null).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    private _handleError(err: HttpErrorResponse): HttpErrorResponse {
        if (err.error.error) {
            this.snackBar.open('Es ist etwas schief gelaufen');
        } else {
            this.snackBar.open(err.error);
        }
        return err;
    }
}
