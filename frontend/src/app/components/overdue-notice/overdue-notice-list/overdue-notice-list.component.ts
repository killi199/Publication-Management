import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { OverdueNoticeEvent } from './check-warnstatus-event';
import { GermanDateAdapter } from 'src/app/helpers/german-date-adapter';

@Component({
    selector: 'app-overdue-notice-list',
    templateUrl: './overdue-notice-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss', './overdue-notice-list.component.scss'],
})
export class OverdueNoticeListComponent extends TableInitsComponent<OverdueNotice> implements OnInit {
    @Input() overdueNotices: Observable<OverdueNotice[]> = new Observable<OverdueNotice[]>();
    @Output() selectRecord = new EventEmitter<OverdueNoticeEvent>();

    selectedRecord?: OverdueNotice;
    displayedColumns: string[] = [
        'publicationKey',
        'surname',
        'name',
        'studentNumber',
        'dateOfReturn',
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

    onEmitSelectRecord(overdueNotice: OverdueNotice): void {
        if (overdueNotice === this.selectedRecord) {
            this.selectRecord.emit(undefined);
            this.selectedRecord = undefined;
        } else {
            const dateOfLastWarning = this.getLatestWarningDate(overdueNotice);
            const warnable = this.isWarnable(dateOfLastWarning);
            const deleteable = overdueNotice.warnings.length >= 3;
            this.selectRecord.emit({ overdueNotice: overdueNotice, warnable: warnable, deleteable: deleteable });
            this.selectedRecord = overdueNotice;
        }
    }

    protected override _defineFilterPredicate(): (data: OverdueNotice, filter: string) => boolean {
        return (data: OverdueNotice, filter: string): boolean => {
            const iswarnableDisplayValue = this.isWarnable(this.getLatestWarningDate(data)) ? 'Ja' : 'Nein';
            const latestWarndate = this.getLatestWarningDate(data);
            const latestWarndateShort = this._convertDate(latestWarndate);
            const dateOfReturn = data.assignment.dateOfReturn;
            const dateOfReturnShort = this._convertDate(dateOfReturn);
            const allValuesInOneString =
                '' +
                data.assignment.publicationKey +
                data.assignment.borrower.studentNumber +
                data.assignment.borrower.name +
                data.assignment.borrower.surname +
                data.assignment.dateOfReturn +
                latestWarndateShort +
                dateOfReturnShort +
                data.warnings.length +
                iswarnableDisplayValue;

            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: OverdueNotice, property: string) => string {
        return (data: OverdueNotice, property: string) => {
            switch (property) {
                case 'publicationKey': {
                    return data.assignment.dateOfReturn.toDateString();
                }

                case 'surname': {
                    return data.assignment.borrower.surname;
                }

                case 'name': {
                    return data.assignment.borrower.name;
                }

                case 'studentNumber': {
                    return data.assignment.borrower.studentNumber;
                }

                case 'dateOfReturn': {
                    return data.assignment.dateOfReturn.toDateString();
                }

                case 'warningDate': {
                    return this.getLatestWarningDate(data)?.toDateString() ?? '';
                }

                case 'amountOfwarnings': {
                    return data.warnings.length.toString();
                }

                case 'isReadyToWarn': {
                    return this.isWarnable(this.getLatestWarningDate(data)) ? 'ja' : 'nein';
                }

                default: {
                    return '';
                }
            }
        };
    }

    private _convertDate(date: Date | null): string {
        const germanDateAdapter: GermanDateAdapter = new GermanDateAdapter();
        return date ? germanDateAdapter.formatDateToShortString(date) : '-';
    }
}
