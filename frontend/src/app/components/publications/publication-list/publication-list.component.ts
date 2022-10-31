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

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    selectedPublication!: Publication;
    onShowPublication(publication: Publication): void {
        if (publication === this.selectedPublication) {
            this.showPublication.emit(undefined);
        } else {
            this.showPublication.emit(publication);
        }
        this.selectedPublication = publication;
    }

    selection = new SelectionModel<Publication>(false, []);

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
}
