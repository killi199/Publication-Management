import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

// Weirder stuff but it works
// https://github.com/angular/components/issues/5041#issuecomment-307752968
// https://github.com/angular/components/issues/8100

@Injectable({
    providedIn: 'root',
})
export class GermanDateAdapter extends NativeDateAdapter {
    constructor() {
        super('');
    }

    formatDateToShortString(date: Date): string {
        return formatDate(date, 'dd.MM.yy', 'de-DE');
    }

    override parse(value: any): Date | null {
        if (typeof value === 'string' && value.indexOf('.') > -1) {
            const str = value.split('.');
            if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
                return null;
            }
            return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]), 12);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
}
