import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['../../../helpers/list-component.scss'],
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

    override _defineFilterPredicate(): (data: Publication, filter: string) => boolean {
        // TODO: Date fehlt, brauche hier das short-date format
        return (data: Publication, filter: string): boolean => {
            const allValuesInOneString =
                '' +
                data.authors?.map((a) => '' + a.name + a.surname).join(' ') +
                data.key +
                data.title +
                data.publisher +
                data.kindOfPublication?.value +
                data.isbn +
                data.keywords?.map((k) => k.value).join(' ') +
                data.quantity;
            return allValuesInOneString?.trim().toLowerCase().includes(filter) ?? false;
        };
    }
}
