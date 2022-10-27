import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements AfterViewInit, OnInit {
    @Input() publications: Publication[] = [];
    @Output() showPublication = new EventEmitter<Publication>();

    dataSource!: MatTableDataSource<Publication>;

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.publications);
    }

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

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onShowPublication(publication: Publication): void {
        this.showPublication.emit(publication);
    }
}
