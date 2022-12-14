// Author: Marcel Dymarz
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Snackbar } from 'src/app/helpers/snackbar';
import { TableInitsComponent } from 'src/app/helpers/table-inits';
import { CrudState } from 'src/app/models/crud-state';
import { Entity } from '../models/entity';

@Component({
    template: '',
})
export abstract class CrudComponent<T extends Entity> extends TableInitsComponent<T> implements OnInit {
    @Input()
    data: Observable<T[]> = new Observable<T[]>();

    @Input()
    delete?: (value: T) => Observable<any>;

    @Input()
    create?: (value: T) => Observable<T>;

    @Input()
    update?: (value: T) => Observable<T>;

    crudState: CrudState = CrudState.Read;
    selectedRecord: T = {} as T;

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
        this.selectedRecord = this.selectedRecord.uuid === selection.uuid ? ({} as T) : structuredClone(selection);
    }

    onEdit(): void {
        this.crudState = CrudState.Update;
    }

    onSave(): void {
        this.crudState === CrudState.Create ? this.onCreate() : this.onUpdate();
    }

    onUndo(): void {
        this.snackBar.open('Nichts geändert!');
        this.crudState = CrudState.Read;
        this.selectedRecord = {} as T;
        this.selection.clear();
        this.selectedRecord = {} as T;
    }

    onDelete(): void {
        this.delete!(this.selectedRecord).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter((r) => r.uuid != this.selectedRecord.uuid);
            this.selectedRecord = {} as T;
            this.snackBar.open('Gelöscht!');
        });
    }

    onAdd(): void {
        this.crudState = CrudState.Create;
        this.selectedRecord = {} as T;
        this.selection.clear();
    }

    onCreate(): void {
        this.create!(this.selectedRecord).subscribe((a) => {
            this.selectedRecord = {} as T;
            this.dataSource.data.push(a);
            this.dataSource.data = this.dataSource.data;
            this.selection.clear();
            this.snackBar.open('Erstellt!');
            this.crudState = CrudState.Read;
        });
    }

    onUpdate(): void {
        this.update!(this.selectedRecord).subscribe((a) => {
            this.selectedRecord = {} as T;
            this.dataSource.data = this.dataSource.data.map((r) => (r.uuid === a.uuid ? a : r));
            this.dataSource.data = this.dataSource.data;
            this.selection.clear();
            this.snackBar.open('Geändert!');
            this.crudState = CrudState.Read;
        });
    }
}
