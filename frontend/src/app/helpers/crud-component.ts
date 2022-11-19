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
        this.selectedRecord =
            this.selectedRecord === selection ? {} as T : selection;
    }

    onEdit(): void {
        this.crudState = CrudState.Update;
    }

    onSave(): void {
        let messageType =
            this.crudState === CrudState.Create
                ? this.onCreate()
                : this.onUpdate();

        this.snackBar.open(messageType);
        this.crudState = CrudState.Read;
        this.selectedRecord = {} as T;
    }

    onUndo(): void {
        this.snackBar.open('Nichts geändert!');
        this.crudState = CrudState.Read;
        this.selectedRecord = {} as T;
        this.selection.clear();
        this.selectedRecord = {} as T;
    }

    onDelete(record: T): void {
        this.delete!(record).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
                (r) => r !== record
            );
            this.selectedRecord = {} as T;
            this.snackBar.open('Gelöscht!');
        });
    }

    onAdd(): void {
        this.crudState = CrudState.Create;
        this.selectedRecord = {} as T;
        this.selection.clear();
    }

    onCreate(): string {
        this.create!(this.selectedRecord).subscribe((a) => {
            this.selectedRecord = {} as T;
            this.dataSource.data.push(a);
            this.dataSource.data = this.dataSource.data;
        });

        return 'Erstellt!';
    }

    onUpdate(): string {
        this.update!(this.selectedRecord).subscribe((a) => {
            this.selectedRecord = {} as T;
            this.selection.clear();
        });

        return 'Geändert!';
    };
}
