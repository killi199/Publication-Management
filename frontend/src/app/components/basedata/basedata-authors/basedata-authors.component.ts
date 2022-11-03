import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-basedata-authors',
  templateUrl: './basedata-authors.component.html',
  styleUrls: ['./basedata-authors.component.scss']
})
export class BasedataAuthorsComponent implements OnInit, AfterViewInit {

  @Input() authors: Author[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['surname', 'name'];

  dataSource!: MatTableDataSource<Author>;

  selection = new SelectionModel<Author>(false, []);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.authors);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}
}
