import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreComponent } from 'src/app/helpers/core-component';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { OverdueNoticeService } from 'src/app/services/overdue-notice.service';
import { CheckWarnstatusEvent } from './overdue-notice-list/overdue-notice-list.component';

@Component({
    selector: 'app-overdue-notice',
    templateUrl: './overdue-notice.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class OverdueNoticeComponent extends CoreComponent<OverdueNotice> {
    data: Observable<OverdueNotice[]>;

    warnable: boolean = false;
    deleteable: boolean = false;

    constructor(service: OverdueNoticeService) {
        super();
        this.data = service.getAll();
    }

    onCheckWarnstatus(event: CheckWarnstatusEvent): void {
        this.currentRecord = event?.overdueNotice;
        this.warnable = event?.warnable;
        this.deleteable = event?.deleteable;
    }
}
