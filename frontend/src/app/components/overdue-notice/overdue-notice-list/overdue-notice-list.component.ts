import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { OverdueNotice } from 'src/app/models/overdue-notice';
import { GermanDateAdapter } from 'src/app/helpers/german-date-adapter';
import { Warning } from 'src/app/models/warning';
import { Snackbar } from 'src/app/helpers/snackbar';

@Component({
    selector: 'app-overdue-notice-list',
    templateUrl: './overdue-notice-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss', './overdue-notice-list.component.scss'],
})
export class OverdueNoticeListComponent extends TableInitsComponent<OverdueNotice> implements OnInit {
    @Input() 
    overdueNotices: Observable<OverdueNotice[]> = new Observable<OverdueNotice[]>();

    @Input()
    delete?: (uuid: string) => Observable<any>;

    @Input()
    createWarning?: (uuid: string) => Observable<Warning>;

    selectedRecord?: OverdueNotice;

    warnable: boolean = false;

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
    }

    onEmitSelectRecord(overdueNotice: OverdueNotice): void {
        if (overdueNotice === this.selectedRecord) {
            this.selectedRecord = undefined;
        } else {
            const dateOfLastWarning = this.getLatestWarningDate(overdueNotice);
            const warnable = this.isWarnable(dateOfLastWarning);
            const deleteable = (overdueNotice.warnings && overdueNotice.warnings.length >= 3) ?? false;
            this.warnable = warnable;
            this.deleteable = deleteable;
            this.selectedRecord = overdueNotice;
        }
    }

    onWarn(): void {
        if(!this.selectedRecord?.uuid) return;

        this.createWarning!(this.selectedRecord?.uuid).subscribe((w) => {
            this.selectedRecord?.warnings?.push(w);
            this.snackBar.open('Warnung erstellt!');
        });
    }

    onDelete(): void {
        if(!this.selectedRecord?.uuid) return;

        this.delete!(this.selectedRecord?.uuid).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter((r) => r.uuid != this.selectedRecord?.uuid);
            this.selectedRecord = undefined;
            this.snackBar.open('Mahnung gelöscht!');
        });
    }

    protected _defineFilterPredicate(): (data: OverdueNotice, filter: string) => boolean {
        return (data: OverdueNotice, filter: string): boolean => {
            const iswarnableDisplayValue = this.isWarnable(this.getLatestWarningDate(data)) ? 'Ja' : 'Nein';
            const latestWarndate = this.getLatestWarningDate(data);
            const latestWarndateShort = this._convertDate(latestWarndate)
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

    private _convertDate(date: Date | null | undefined): string {
        const germanDateAdapter: GermanDateAdapter = new GermanDateAdapter();
        return date ? germanDateAdapter.formatDateToShortString(date) : '-';
    }
}
