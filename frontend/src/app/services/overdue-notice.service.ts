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
            studentNumber: '434',
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
        const warning1: Warning = {
            uuid: 'warning-uuid-test123',
            overdueNoticeUuid: 'UUIDAF-123-#222',
            warningDate: new Date(2022, 10, 10),
        };
        const warning2: Warning = {
            uuid: 'warning-uuid-test123',
            overdueNoticeUuid: 'UUIDAF-123-#222',
            warningDate: new Date(2022, 10, 17),
        };
        const overdueNotice1: OverdueNotice = {
            uuid: 'UUIDAF-123-#222',
            assignment: assignment,
            warnings: [warning1,warning2],
        };
        const overdueNotice2: OverdueNotice = {
            uuid: 'UUIDAF-123-#222',
            assignment: assignment,
            warnings: [warning1],
        };
        const overdueNotice3: OverdueNotice = {
            uuid: 'UUIDAF-123-#222',
            assignment: assignment,
            warnings: [],
        };
        const overdueNotice4: OverdueNotice = {
            uuid: 'UUIDAF-123-#222',
            assignment: assignment,
            warnings: [warning1, warning1, warning1],
        };
        const overdueNotice5: OverdueNotice = {
            uuid: 'UUIDAF-123-#222',
            assignment: assignment,
            warnings: [warning1, warning1, warning2, warning1],
        };
        return of([overdueNotice1, overdueNotice2, overdueNotice3, overdueNotice4, overdueNotice5]);
    }
}
