import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent extends TableInitsComponent<Publication> implements OnInit {
    @Input() publications: Observable<Publication[]> = new Observable<Publication[]>();

    @Output() showPublication = new EventEmitter<Publication>();

    selectedPublication?: Publication;

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

    constructor() {
        super();
        this._filterSpecifications();
    }

    ngOnInit(): void {
        this.publications.subscribe((publications) => {
            this.dataSource.data = publications;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
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

    private _filterSpecifications(): void {
        this.dataSource.filterPredicate = (data: Publication, filter: string): boolean => {
            const keyFilter = this._include(data.key, filter);
            const titleFilter = this._include(data.title, filter);
            const authorFilter = this._include(data.authors?.map((a) => '' + a.name + a.surname).join(' '), filter);
            // TODO: iwie an das short-Date Format rankommen und dann wie gehabt zum string machen und gucken ob der filter im string steckt..
            // const dateOfPublicationFilter = data.dateOfPublication;
            const publisherFilter = this._include(data.publisher, filter);
            const kindOfPubFilter = this._include(data.kindOfPublication?.value, filter);
            const isbnFilter = this._include(data.isbn, filter);
            const keywordFilter = this._include(data.keywords?.map((k) => k.value).join(' '), filter);
            const quantityFilter = this._include(data.quantity?.toString(), filter);
            return (
                keyFilter ||
                titleFilter ||
                authorFilter ||
                publisherFilter ||
                kindOfPubFilter ||
                isbnFilter ||
                keywordFilter ||
                quantityFilter
            );
        };
    }

    private _include(dataValue: string | undefined | null, filter: string): boolean {
        return dataValue?.trim().toLowerCase().includes(filter) ?? false;
    }
}
