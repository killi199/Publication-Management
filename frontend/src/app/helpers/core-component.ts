import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    template: '',
})
export abstract class CoreComponent<T> {
    abstract data: Observable<T[]>;
    isViewOpen: boolean = false;
    currentRecord?: T;

    onBack(): void {
        this.currentRecord = undefined;
        this.isViewOpen = false;
    }

    onEdit(): void {
        this.isViewOpen = true;
    }

    onAdd(): void {
        this.currentRecord = undefined;
        this.isViewOpen = true;
    }

    onSelect(record: T): void {
        this.currentRecord = record;
    }
}
