import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Snackbar } from "src/app/helpers/snackbar";
import { TableInitsComponent } from "src/app/helpers/table-inits";
import { CrudState } from "src/app/models/crud-state";

@Component({
    template: '',
})
export abstract class CrudComponent<T> extends TableInitsComponent<T>{
    @Input() data: T[] = [];
    @Output() onDelete = new EventEmitter<T>();
    @Output() onCreate = new EventEmitter<T>();
    @Output() onUpdate = new EventEmitter<T>();

    crudState: CrudState = CrudState.Read;
    selectedRecord?: T;

    constructor(private snackBar: Snackbar) {
        super();
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.data);
    }

    selectionChanged(T: T): void {
        this.selectedRecord =
            this.selectedRecord === T
                ? undefined
                : T;
    }

    edit(): void {
        this.crudState = CrudState.Update;
    }

    save(): void {
        const recordToSave = this._getRecordFromInputFields();
        let messageType =
            this.crudState === CrudState.Create
                ? this._emitOnCreate(recordToSave)
                : this._emitOnUpdate(recordToSave);

        this.snackBar.open(messageType);
        this.dataSource = new MatTableDataSource(this.data);
        this.crudState = CrudState.Read;
        this._clearInputFields();
    }

    undo(): void {
        this.snackBar.open('Nothing changed!');
        this.crudState = CrudState.Read;
        this._clearInputFields();
        this.selection.clear();
        this.selectedRecord = undefined;
    }

    delete(nameOfRecord: string): void {
        this.onDelete.emit(this.selectedRecord);
        this.dataSource = new MatTableDataSource(this.data);
        this.selectedRecord = undefined;
        this.snackBar.open(nameOfRecord + ' deleted!');
    }

    add(): void {
        this.crudState = CrudState.Create;
        this.selectedRecord = undefined;
        this.selection.clear();
    }

    abstract _emitOnCreate(record: T): string;
    abstract _emitOnUpdate(record: T): string;
    abstract _getRecordFromInputFields(): T;
    abstract _clearInputFields(): void;
}
