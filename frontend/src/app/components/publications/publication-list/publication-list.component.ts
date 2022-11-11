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
import { Observable } from 'rxjs';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-list',
    templateUrl: './publication-list.component.html',
    styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements AfterViewInit, OnInit {
    @Input() 
    publications: Observable<Publication[]> = new Observable<Publication[]>;
    
    @Output() 
    showPublication = new EventEmitter<Publication>();

    @ViewChild(MatSort) 
    sort: MatSort = new MatSort();

    @ViewChild(MatPaginator) 
    paginator!: MatPaginator;

    dataSource = new MatTableDataSource<Publication>;

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
        this.publications.subscribe(publications => {
            this.dataSource.data = publications;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
