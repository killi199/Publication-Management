import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../models/assignment';
import { Borrower } from '../models/borrower';
import { OverdueNotice } from '../models/overdue-notice';
import { Warning } from '../models/warning';

@Injectable({
    providedIn: 'root',
})
export class OverdueNoticeService {
    getAll(): Observable<OverdueNotice[]> {
        const borrower: Borrower = {
            uuid: 'studenuuid-test123',
            studentnumber: '434',
            name: 'Max',
            surname: 'Mustermann',
        };
        const assignment: Assignment = {
            uuid: 'assignment-UUID-test123',
            publicationKey: 'pubkeyTest123',
            dateOfAssignment: new Date(2018, 12, 22),
            dateOfReturn: new Date(2019, 1, 1),
            borrower: borrower,
        };
        const warning: Warning = {
            uuid: 'warning-uuid-test123',
            overdueNoticeUui: 'UUIDAF-123-#222',
            warningDate: new Date(2022, 1, 1),
        };
        const overdueNotice: OverdueNotice = {
            uuid: 'UUIDAF-123-#222',
            assignments: [assignment],
            warnings: [warning],
        };
        return of([overdueNotice]);
    }
}
