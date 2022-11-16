import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent extends TableInitsComponent<Publication> {
    @Input() publications: Observable<Publication[]> = new Observable<
        Publication[]
    >();

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
}
