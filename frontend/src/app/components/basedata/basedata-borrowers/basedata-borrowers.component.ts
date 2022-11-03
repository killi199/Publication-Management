import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Borrower } from 'src/app/models/borrower';

@Component({
  selector: 'app-basedata-borrowers',
  templateUrl: './basedata-borrowers.component.html',
  styleUrls: ['./basedata-borrowers.component.scss']
})
export class BasedataBorrowersComponent implements OnInit, AfterViewInit {
  @Input() borrowers: Borrower[] = [];
  
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['surname', 'name', 'studentnumber'];

  dataSource!: MatTableDataSource<Borrower>;

  selection = new SelectionModel<Borrower>(false, []);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
}


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.borrowers);
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

}
