import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements OnInit {
    @Input() publications: Publication[] = [];
    @Output() showPublication = new EventEmitter<Publication>();

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

    constructor() {}

    ngOnInit(): void {}

    onShowPublication(publication: Publication): void {
        this.showPublication.emit(publication);
    }
}
