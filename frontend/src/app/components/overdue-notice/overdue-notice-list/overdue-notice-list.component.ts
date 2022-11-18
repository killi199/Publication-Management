import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { OverdueNotice } from 'src/app/models/overdue-notice';

@Component({
    selector: 'app-overdue-notice-list',
    templateUrl: './overdue-notice-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class OverdueNoticeListComponent extends TableInitsComponent<OverdueNotice> {
    @Input() overdueNotices: Observable<OverdueNotice[]> = new Observable<
        OverdueNotice[]
    >();
    displayedColumns: string[] = [
        'assignment.publicationKey',
        'assignment.borrower.name',
        'assignment.borrower.surname',
        'assignment.borrower.studentNumber',
        'assignment.dateOfReturn',
    ];

    ngOnInit(): void {
        this.overdueNotices.subscribe((overdueNotices) => {
            this.dataSource.data = overdueNotices;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
