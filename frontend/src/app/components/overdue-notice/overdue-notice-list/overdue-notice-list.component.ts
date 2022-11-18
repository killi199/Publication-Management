import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { OverdueNotice } from 'src/app/models/overdue-notice';

@Component({
    selector: 'app-overdue-notice-list',
    templateUrl: './overdue-notice-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class OverdueNoticeListComponent extends TableInitsComponent<OverdueNotice> {
    @Input() overdueNotices: Observable<OverdueNotice[]> = new Observable<OverdueNotice[]>();
    @Output() checkRecord = new EventEmitter<CheckWarnstatusEvent>();

    selectedRecord?: OverdueNotice;
    displayedColumns: string[] = [
        'assignment.publicationKey',
        'assignment.borrower.name',
        'assignment.borrower.surname',
        'assignment.borrower.studentNumber',
        'assignment.dateOfReturn',
        'warningDate',
        'amountOfwarnings',
        'isReadyToWarn',
    ];

    calculateDateDifferences = (warningDate: Date) => {
        const today = new Date();
        const diffInDays = Math.floor((today.getTime() - warningDate?.getTime()) / (24 * 60 * 60 * 1000));
        return diffInDays >= 7 || warningDate == null ? 'ja' : 'nein';
    };

    isWarnReady(event: OverdueNotice): boolean {
        return this.calculateDateDifferences(event.warnings.slice(-1)[0]?.warningDate) == 'ja';
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
            const warnable = this.isWarnReady(overdueNotice);
            const deleteable = overdueNotice.warnings.length >= 3;
            this.checkRecord.emit({overdueNotice: overdueNotice, warnable: warnable, deleteable: deleteable});
            this.selectedRecord = overdueNotice;
        }
    }
}

export interface CheckWarnstatusEvent{
    overdueNotice: OverdueNotice;
    warnable: boolean;
    deleteable: boolean;
}
