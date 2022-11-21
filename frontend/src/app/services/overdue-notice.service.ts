// Author: Kevin Jahrens
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Snackbar } from '../helpers/snackbar';
import { OverdueNotice } from '../models/overdue-notice';
import { Warning } from '../models/warning';

const ENDPOINT_URL = '/rest/overdue-notice';
@Injectable({
    providedIn: 'root',
})
export class OverdueNoticeService {
    
    constructor(private http: HttpClient, private snackBar: Snackbar) {}

    getAll(): Observable<OverdueNotice[]> {
        return this.http.get<OverdueNotice[]>(ENDPOINT_URL).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    createWarning(uuid: string): Observable<Warning> {
        return this.http.post<Warning>(`${ENDPOINT_URL}/warning/${uuid}`, null).pipe(
            catchError((err: HttpErrorResponse) => {
                throw this._handleError(err);
            })
        );
    }

    private _handleError(err: HttpErrorResponse): HttpErrorResponse {
        if(err.error.error) {
            this.snackBar.open('Es ist etwas schief gelaufen');
        }
        else {
            this.snackBar.open(err.error);
        }
        return err;
    }
}
