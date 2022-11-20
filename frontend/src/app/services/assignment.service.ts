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

    update(assignment: Assignment): Observable<Assignment> {
        return of(assignment);
    }

    create(assignment: Assignment): Observable<Assignment> {
        return this.http.post<Assignment>(ENDPOINT_URL, assignment).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    getAll(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(ENDPOINT_URL).pipe(
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

    extendAssignment(assignment: Assignment): Observable<Assignment> {
        return of(assignment);
    }

    isAssignmentExtendable(assignment: Assignment): Observable<boolean> {
        return of(true);
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
