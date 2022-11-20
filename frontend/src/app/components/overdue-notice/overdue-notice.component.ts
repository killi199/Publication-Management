import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { OverdueNoticeService } from 'src/app/services/overdue-notice.service';
import { OverdueNoticeEvent } from './overdue-notice-list/check-warnstatus-event';

@Component({
    selector: 'app-overdue-notice',
    templateUrl: './overdue-notice.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class OverdueNoticeComponent {
    data: Observable<OverdueNotice[]>;
    currentRecord?: OverdueNotice;
    warnable: boolean = false;
    deleteable: boolean = false;

    constructor(private overdueNoticeService: OverdueNoticeService) {
        this.data = overdueNoticeService.getAll();
    }

    onSetSelection(event: OverdueNoticeEvent): void {
        this.currentRecord = event?.overdueNotice;
        this.warnable = event?.warnable;
        this.deleteable = event?.deleteable;
    }

    onWarn(): void {
        if(!this.currentRecord?.uuid) return;

        this.overdueNoticeService.createWarning(this.currentRecord?.uuid).subscribe();
    }

    onDelete(): void {
        if(!this.currentRecord?.uuid) return;

        this.overdueNoticeService.delete(this.currentRecord?.uuid).subscribe();
    }
}
