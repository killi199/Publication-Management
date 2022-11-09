import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { TableInitsComponent } from '../../../helpers/table-inits';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['./basedata-kinds.component.scss'],
})
export class BasedataKindsComponent
    extends TableInitsComponent<KindOfPublication>
    implements OnInit
{
    @Input() kindOfPublications: KindOfPublication[] = [];
    @Output() deleteKindOfPub = new EventEmitter<KindOfPublication>();

    constructor(private snackBar: MatSnackBar){
        super();
    }

    displayedColumns: string[] = ['kindOfPublication'];

    editMode = false;
    selectedKindOfPub: KindOfPublication | undefined;
    tableDisabled = false;

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }

    selectionChanged(kindOfPublication: KindOfPublication) {
        this.selectedKindOfPub = kindOfPublication;
    }

    edit() {
        this.editMode = true;
        this.tableDisabled = true;
    }

    save(nameOfPub: string) {
        this.editMode = false;
        this.tableDisabled = false;        
        this.openSnackbar(nameOfPub + ' created!');
    }

    undo() {
        this.editMode = false;
        this.tableDisabled = false;
        this.openSnackbar('Nothing changed!');
    }

    delete() {
        this.deleteKindOfPub.emit(this.selectedKindOfPub);
        const nameOfPubKind = this.selectedKindOfPub?.value;
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
        this.selectedKindOfPub = undefined;
        this.openSnackbar(nameOfPubKind + ' deleted!');
    }

    add() {
        this.editMode = true;
        this.selectedKindOfPub = undefined;
        this.tableDisabled = true;
    }

    openSnackbar(message: string){
        this.snackBar.open(message, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000
        });
    }
}
