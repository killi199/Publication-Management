import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GermanDateAdapter } from 'src/app/helpers/german-date-adapter';
import { Snackbar } from 'src/app/helpers/snackbar';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
})
export class PublicationListComponent extends TableInitsComponent<Publication> implements OnInit, OnDestroy {
    @Input()
    publications: Observable<Publication[]> = new Observable<Publication[]>();

    @Input()
    updateDataOnDelete?: Observable<any>;

    @Input()
    updateData?: Observable<Observable<Publication[]>>;

    @Output()
    showPublication = new EventEmitter<Publication>();

    selectedPublication?: Publication;

    private eventsSubscription?: Subscription;

    displayedColumns: string[] = [
        'key',
        'title',
        'authors',
        'dateOfPublication',
        'publisher',
        'kindOfPublication',
        'isbn',
        'keywords',
        'quantity',
    ];

    ngOnInit(): void {
        this._loadData(this.publications);
        this.eventsSubscription = this.updateDataOnDelete?.subscribe((a) => {
            this.dataSource.data = this.dataSource.data.filter((publication) => publication.key !== a.key);
        });
        this.eventsSubscription = this.updateData?.subscribe((publications) => {
            this._loadData(publications);
        });
    }

    ngOnDestroy() {
        this.eventsSubscription?.unsubscribe();
    }

    onShowPublication(publication: Publication): void {
        if (publication === this.selectedPublication) {
            this.showPublication.emit(undefined);
            this.selectedPublication = undefined;
        } else {
            this.showPublication.emit(publication);
            this.selectedPublication = publication;
        }
    }

    protected override _defineFilterPredicate(): (data: Publication, filter: string) => boolean {
        const germanDateAdapter: GermanDateAdapter = new GermanDateAdapter();
        return (data: Publication, filter: string): boolean => {
            const dateOfPub = data.dateOfPublication;
            const dateOfPubShort = dateOfPub ? germanDateAdapter.formatDateToShortString(dateOfPub) : '-';
            const allValuesInOneString =
                '' +
                data.authors?.map((a) => '' + a.name + a.surname).join(' ') +
                data.key +
                data.title +
                data.publisher +
                data.kindOfPublication?.value +
                data.isbn +
                dateOfPubShort +
                data.keywords?.map((k) => k.value).join(' ') +
                data.quantity;
            return allValuesInOneString?.trim().toLowerCase().includes(filter) ?? false;
        };
    }

    protected override _defineSortingAccessor(): (data: Publication, property: string) => string {
        return (data: Publication, property: string) => {
            switch (property) {
                case 'kindOfPublication': {
                    return data.kindOfPublication?.value ?? '';
                }

                case 'key': {
                    return data.key ?? '';
                }

                case 'title': {
                    return data.title ?? '';
                }

                case 'authors': {
                    const authorFirstSurname = data.authors?.map((a) => a.surname)[0];
                    return authorFirstSurname ?? '';
                }

                case 'dateOfPublication': {
                    return data.dateOfPublication?.toString() ?? '';
                }

                case 'publisher': {
                    return data.publisher ?? '';
                }

                case 'isbn': {
                    return data.isbn ?? '';
                }

                case 'keywords': {
                    const firstKeyword = data.keywords?.map((k) => k.value)[0];
                    return firstKeyword ?? '';
                }

                case 'quantity': {
                    return data.quantity?.toString() ?? '';
                }

                default: {
                    return '';
                }
            }
        };
    }

    private _loadData(publications: Observable<Publication[]>): void {
        publications.subscribe((publications) => {
            this.dataSource.data = publications;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
