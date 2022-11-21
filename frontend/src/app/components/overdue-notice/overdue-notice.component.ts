import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { Warning } from 'src/app/models/warning';
import { AssignmentService } from 'src/app/services/assignment.service';
import { OverdueNoticeService } from 'src/app/services/overdue-notice.service';
import { OverdueNoticeEvent } from './overdue-notice-list/overdue-notice-event';

@Component({
    selector: 'app-overdue-notice',
    templateUrl: './overdue-notice.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class OverdueNoticeComponent {
    onLossSubject: Subject<void> = new Subject<void>();
    onWarnSubject: Subject<Warning> = new Subject<Warning>();
    data: Observable<OverdueNotice[]>;
    currentRecord?: OverdueNotice;
    deleteable: boolean = false;

    constructor(private overdueNoticeService: OverdueNoticeService, private assignmentService: AssignmentService) {
        this.data = overdueNoticeService.getAll();
    }

    onLoss() {
        if (!this.currentRecord?.assignment?.uuid) return;
        this.assignmentService.publicationLost(this.currentRecord?.assignment?.uuid).subscribe(() => {
            this.onLossSubject.next();
        });
    }

    onWarn() {
        if (!this.currentRecord?.uuid) return;
        this.overdueNoticeService.createWarning(this.currentRecord?.uuid).subscribe((w) => {
            this.currentRecord?.warnings?.push(w);
            this.deleteable = (this.currentRecord?.warnings && this.currentRecord.warnings.length >= 3) ?? false;
            this.onWarnSubject.next(w);
        });
    }

    onSetSelection(event: OverdueNoticeEvent): void {
        this.currentRecord = event?.overdueNotice;
        this.deleteable = event?.deleteable;
    }
}
