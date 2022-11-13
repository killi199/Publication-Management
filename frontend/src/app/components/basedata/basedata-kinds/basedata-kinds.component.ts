import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { TableInitsComponent } from '../../../helpers/table-inits';
import { Snackbar } from 'src/app/helpers/snackbar';
import { CrudState } from 'src/app/models/crud-state';

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
    @Output() createKindOfPub = new EventEmitter<KindOfPublication>();
    @Output() updateKindOfPub = new EventEmitter<KindOfPublication>();

    displayedColumns: string[] = ['kindOfPublication'];

    crudState: CrudState = CrudState.Read;
    selectedKindOfPub: KindOfPublication = new KindOfPublication();

    constructor(private snackBar: Snackbar) {
        super();
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }

    selectionChanged(kindOfPublication: KindOfPublication): void {
        this.selectedKindOfPub =
            this.selectedKindOfPub === kindOfPublication
                ? new KindOfPublication()
                : kindOfPublication;
    }

    edit(): void {
        this.crudState = CrudState.Update;
    }

    save(nameOfPub: string): void {
        let messageType = '';
        if (this.crudState === CrudState.Create) {
            if (nameOfPub?.trim()) {
                this.createKindOfPub.emit({ value: nameOfPub });
                messageType = nameOfPub + ' created!';
            } else {
                messageType = 'Nothing to add!';
            }
        } else {
            if (this.selectedKindOfPub.value !== nameOfPub) {
                this.updateKindOfPub.emit({
                    uuid: this.selectedKindOfPub.uuid,
                    value: nameOfPub,
                });
                messageType = nameOfPub + ' updated!';
            }
            else{
                messageType = 'Nothing to change!';
            }
        }

        this.snackBar.open(messageType);
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
        this.crudState = CrudState.Read;
        (<HTMLInputElement>document.getElementById('inputField')).value = '';
    }

    undo(): void {
        this.snackBar.open('Nothing changed!');
        this.crudState = CrudState.Read;
        (<HTMLInputElement>document.getElementById('inputField')).value = '';
        this.selection.clear();
    }

    delete(): void {
        this.deleteKindOfPub.emit(this.selectedKindOfPub);
        const nameOfPubKind = this.selectedKindOfPub.value;
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
        this.selectedKindOfPub = new KindOfPublication();
        this.snackBar.open(nameOfPubKind + ' deleted!');
    }

    add(): void {
        this.crudState = CrudState.Create;
        this.selectedKindOfPub = new KindOfPublication();
        this.selection.clear();
    }
}
