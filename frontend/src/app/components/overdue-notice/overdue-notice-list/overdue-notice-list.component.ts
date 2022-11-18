import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { OverdueNotice } from 'src/app/models/overdue-notice';

@Component({
    selector: 'app-overdue-notice-list',
    templateUrl: './overdue-notice-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class OverdueNoticeListComponent extends TableInitsComponent<OverdueNotice> implements OnInit {
    @Input() overdueNotices: Observable<OverdueNotice[]> = new Observable<OverdueNotice[]>();
    @Output() checkRecord = new EventEmitter<CheckWarnstatusEvent>();

    selectedRecord?: OverdueNotice;
    displayedColumns: string[] = [
        'assignment.publicationKey',
        'assignment.borrower.surname',
        'assignment.borrower.name',
        'assignment.borrower.studentNumber',
        'assignment.dateOfReturn',
        'warningDate',
        'amountOfwarnings',
        'isReadyToWarn',
    ];

    isWarnable(warningDate: Date | null): boolean {
        if (!warningDate) return true;
        const today = new Date();
        const diffInDays = Math.floor((today.getTime() - warningDate?.getTime()) / (24 * 60 * 60 * 1000));
        return diffInDays >= 7;
    }

    getLatestWarningDate(overdueNotice: OverdueNotice): Date | null {
        return overdueNotice.warnings.length > 0
            ? overdueNotice.warnings.reduce((a, b) => (a.warningDate > b.warningDate ? a : b)).warningDate
            : null;
    }

    ngOnInit(): void {
        this.overdueNotices.subscribe((overdueNotices) => {
            this.dataSource.data = overdueNotices;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    onCheckWarnstatus(overdueNotice: OverdueNotice): void {
        if (overdueNotice === this.selectedRecord) {
            this.checkRecord.emit(undefined);
            this.selectedRecord = undefined;
        } else {
            const dateOfLastWarning = this.getLatestWarningDate(overdueNotice);
            const warnable = this.isWarnable(dateOfLastWarning);
            const deleteable = overdueNotice.warnings.length >= 3;
            this.checkRecord.emit({ overdueNotice: overdueNotice, warnable: warnable, deleteable: deleteable });
            this.selectedRecord = overdueNotice;
        }
    }
}

export interface CheckWarnstatusEvent {
    overdueNotice: OverdueNotice;
    warnable: boolean;
    deleteable: boolean;
}
