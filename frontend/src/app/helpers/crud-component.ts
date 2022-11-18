import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Snackbar } from 'src/app/helpers/snackbar';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { CrudState } from 'src/app/models/crud-state';

@Component({
    template: '',
})
export abstract class CrudComponent<T>
    extends TableInitsComponent<T>
    implements OnInit
{
    @Input()
    data: Observable<T[]> = new Observable<T[]>();

    @Input()
    delete?: (value: T) => Observable<any>;

    @Input()
    create?: (value: T) => Observable<T>;

    @Input()
    update?: (value: T) => Observable<T>;

    crudState: CrudState = CrudState.Read;
    selectedRecord?: T;

    constructor(private snackBar: Snackbar) {
        super();
    }

    ngOnInit(): void {
        this.data.subscribe((data) => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    selectionChanged(selection: T): void {
        this.selectedRecord =
            this.selectedRecord === selection ? undefined : selection;
    }

    onEdit(): void {
        this.crudState = CrudState.Update;
    }

    onSave(): void {
        const recordToSave = this._getRecordFromInputFields();
        let messageType =
            this.crudState === CrudState.Create
                ? this._emitCreate(recordToSave)
                : this._emitUpdate(recordToSave);

        this.snackBar.open(messageType);
        this.crudState = CrudState.Read;
        this._clearInputFields();
    }

    onUndo(): void {
        this.snackBar.open('Nichts geändert!');
        this.crudState = CrudState.Read;
        this._clearInputFields();
        this.selection.clear();
        this.selectedRecord = undefined;
    }

    onDelete(record: T): void {
        this.delete!(record).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
                (r) => r !== record
            );
            this.selectedRecord = undefined;
            this.snackBar.open('Gelöscht!');
        });
    }

    onAdd(): void {
        this.crudState = CrudState.Create;
        this.selectedRecord = undefined;
        this.selection.clear();
    }

    abstract _emitCreate(record: T): string;
    abstract _emitUpdate(record: T): string;
    abstract _getRecordFromInputFields(): T;
    abstract _clearInputFields(): void;
}
