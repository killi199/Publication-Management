import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreComponent } from 'src/app/helpers/core-component';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { OverdueNoticeService } from 'src/app/services/overdue-notice.service';

@Component({
    selector: 'app-overdue-notice',
    templateUrl: './overdue-notice.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class OverdueNoticeComponent extends CoreComponent<OverdueNotice> {
    data: Observable<OverdueNotice[]>;

    constructor(service: OverdueNoticeService) {
        super();
        this.data = service.getAll();
    }
}
