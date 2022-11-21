// Author: Marcel Dymarz
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class Snackbar {
    constructor(private snackbar: MatSnackBar) {}

    open(message: string): void {
        this.snackbar.open(message, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
        });
    }
}
