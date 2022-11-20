import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { AssignmentService } from 'src/app/services/assignment.service';
import { OverdueNoticeService } from 'src/app/services/overdue-notice.service';

@Component({
    selector: 'app-overdue-notice',
    templateUrl: './overdue-notice.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class OverdueNoticeComponent {
    data: Observable<OverdueNotice[]>;

    constructor(private overdueNoticeService: OverdueNoticeService, private assignmentService: AssignmentService) {
        this.data = overdueNoticeService.getAll();
    }

    publicationLost = (uuid: string): Observable<any> => {
        return this.assignmentService.publicationLost(uuid);
    }

    createWarning = (uuid: string): Observable<any> => {
        return this.overdueNoticeService.createWarning(uuid);
    }
}
