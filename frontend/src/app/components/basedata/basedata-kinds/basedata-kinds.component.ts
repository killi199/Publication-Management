import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { TableInits } from '../../../helpers/table-inits';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['./basedata-kinds.component.scss'],
})
export class BasedataKindsComponent
    extends TableInits<KindOfPublication>
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
    }

    save() {
        this.editMode = false;
        this.tableDisabled = false;
    }

    undo() {
        this.editMode = false;
        this.tableDisabled = false;
    }

    delete() {
        this.deleteKindOfPub.emit(this.selectedKindOfPub);
        const nameOfPubKind = this.selectedKindOfPub?.value;
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
        this.selectedKindOfPub = undefined;
        this.snackBar.open(nameOfPubKind + ' deleted!', 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000
        });
    }

    add() {
        this.editMode = true;
        this.selectedKindOfPub = undefined;
        this.tableDisabled = true;
    }
}
