import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    dataSource!: MatTableDataSource<Publication>;

    selectedPublication?: Publication;

    selection = new SelectionModel<Publication>(false, []);

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
        this.dataSource = new MatTableDataSource(this.publications);
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onShowPublication(publication: Publication): void {
        if (publication.equals(this.selectedPublication)) {
            this.showPublication.emit(undefined);
        } else {
            this.showPublication.emit(publication);
        }
        this.selectedPublication = publication;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
