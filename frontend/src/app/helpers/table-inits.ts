// Author: Marcel Dymarz
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    template: '',
})
export abstract class TableInitsComponent<Type> implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort = new MatSort();
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    abstract displayedColumns: string[];

    dataSource: MatTableDataSource<Type> = new MatTableDataSource<Type>();
    selection = new SelectionModel<Type>(false, []);

    constructor() {
        this.dataSource.filterPredicate = this._defineFilterPredicate();
        this.dataSource.sortingDataAccessor = this._defineSortingAccessor();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    protected abstract _defineFilterPredicate(): (data: Type, filter: string) => boolean;
    protected abstract _defineSortingAccessor(): (data: Type, property: string) => string;
}
