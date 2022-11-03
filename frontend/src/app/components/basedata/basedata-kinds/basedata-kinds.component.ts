import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KindOfPublication } from 'src/app/models/kind-of-publication';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['./basedata-kinds.component.scss'],
})
export class BasedataKindsComponent implements OnInit, AfterViewInit {
    @Input() kindOfPublications: KindOfPublication[] = [];

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['kindOfPublication'];

    dataSource!: MatTableDataSource<KindOfPublication>;

    selection = new SelectionModel<KindOfPublication>(false, []);

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
