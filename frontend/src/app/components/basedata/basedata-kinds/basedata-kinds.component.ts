import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
    @Output() deleteKindOfPub = new EventEmitter<KindOfPublication>();

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['kindOfPublication'];

    dataSource!: MatTableDataSource<KindOfPublication>;

    selection = new SelectionModel<KindOfPublication>(false, []);

    editMode = false;
    selectedKindOfPub: KindOfPublication | undefined;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    selectionChanged(kindOfPublication: KindOfPublication){
        this.selectedKindOfPub = kindOfPublication;
    }

    edit(){
        this.editMode = true;
    }

    save(){
        this.editMode = false;
    }

    undo(){
        this.editMode = false;
    }

    delete(){
        this.deleteKindOfPub.emit(this.selectedKindOfPub);
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }
}
