// Author: Marcel Dymarz
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { GermanDateAdapter } from 'src/app/helpers/german-date-adapter';
import { Warning } from 'src/app/models/warning';
import { Snackbar } from 'src/app/helpers/snackbar';
import { OverdueNoticeEvent } from './overdue-notice-event';

@Component({
    selector: 'app-overdue-notice-list',
    templateUrl: './overdue-notice-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss', './overdue-notice-list.component.scss'],
})
export class OverdueNoticeListComponent extends TableInitsComponent<OverdueNotice> implements OnInit, OnDestroy {
    private eventsSubscription?: Subscription;

    @Input()
    overdueNotices: Observable<OverdueNotice[]> = new Observable<OverdueNotice[]>();

    @Input()
    updateDataOnLoss?: Observable<void>;

    @Input()
    updateDataOnWarn?: Observable<Warning>;

    @Output()
    selectRecord = new EventEmitter<OverdueNoticeEvent>();

    selectedRecord?: OverdueNotice;

    deleteable: boolean = false;

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

    constructor(private snackBar: Snackbar) {
        super();
    }

    isWarnable(warningDate: Date | null): boolean {
        if (!warningDate) return true;
        const diffInDays = Math.floor((new Date().getTime() - new Date(warningDate).getTime()) / (24 * 60 * 60 * 1000));
        return diffInDays >= 7;
    }

    getLatestWarningDate(overdueNotice: OverdueNotice): Date | null {
        return overdueNotice.warnings && overdueNotice.warnings.length > 0
            ? overdueNotice.warnings.reduce((a, b) => (a.warningDate > b.warningDate ? a : b)).warningDate
            : null;
    }

    ngOnInit(): void {
        this.overdueNotices.subscribe((overdueNotices) => {
            this.dataSource.data = overdueNotices;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        this.eventsSubscription = this.updateDataOnLoss?.subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter((r) => r.uuid != this.selectedRecord?.uuid);
            this.selectedRecord = undefined;
            this.snackBar.open('Verlust gemeldet. Mahnung wurde archiviet.');
        });
        this.eventsSubscription = this.updateDataOnWarn?.subscribe((w) => {
            this.snackBar.open('Warnung erstellt!');
        });
    }

    ngOnDestroy() {
        this.eventsSubscription?.unsubscribe();
    }

    onEmitSelectRecord(overdueNotice: OverdueNotice): void {
        if (overdueNotice === this.selectedRecord) {
            this.selectRecord.emit(undefined);
            this.selectedRecord = undefined;
        } else {
            const deleteable = (overdueNotice.warnings && overdueNotice.warnings.length >= 3) ?? false;
            this.selectRecord.emit({ overdueNotice: overdueNotice, deleteable: deleteable });
            this.deleteable = deleteable;
            this.selectedRecord = overdueNotice;
        }
    }

    protected override _defineFilterPredicate(): (data: OverdueNotice, filter: string) => boolean {
        return (data: OverdueNotice, filter: string): boolean => {
            const iswarnableDisplayValue = this.isWarnable(this.getLatestWarningDate(data)) ? 'Ja' : 'Nein';
            const latestWarndate = this.getLatestWarningDate(data);
            const latestWarndateShort = this._convertDate(latestWarndate);
            const dateOfReturn = data.assignment?.dateOfReturn;
            const dateOfReturnShort = this._convertDate(dateOfReturn);
            const allValuesInOneString =
                '' +
                data.assignment?.publication?.key +
                data.assignment?.borrower?.studentNumber +
                data.assignment?.borrower?.name +
                data.assignment?.borrower?.surname +
                data.assignment?.dateOfReturn +
                latestWarndateShort +
                dateOfReturnShort +
                data.warnings?.length +
                iswarnableDisplayValue;

            return allValuesInOneString.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: OverdueNotice, property: string) => string {
        return (data: OverdueNotice, property: string) => {
            switch (property) {
                case 'publicationKey': {
                    return data.assignment?.publication?.key ?? '';
                }

                case 'surname': {
                    return data.assignment?.borrower?.surname ?? '';
                }

                case 'name': {
                    return data.assignment?.borrower?.name ?? '';
                }

                case 'studentNumber': {
                    return data.assignment?.borrower?.studentNumber ?? '';
                }

                case 'dateOfReturn': {
                    return data.assignment?.dateOfReturn?.toString() ?? '';
                }

                case 'warningDate': {
                    return this.getLatestWarningDate(data)?.toString() ?? '';
                }

                case 'amountOfwarnings': {
                    return data.warnings?.length.toString() ?? '';
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

    private _convertDate(date: Date | null | undefined): string {
        const germanDateAdapter: GermanDateAdapter = new GermanDateAdapter();
        return date ? germanDateAdapter.formatDateToShortString(date) : '-';
    }
}
