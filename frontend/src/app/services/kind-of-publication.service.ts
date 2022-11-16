import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KindOfPublication } from '../models/kind-of-publication';

@Injectable({
    providedIn: 'root',
})
export class KindOfPublicationService {
    kindsOfPublication: KindOfPublication[];

    constructor() {
        this.kindsOfPublication = this._generateAllKindsOfPublication();
    }

    update(kindOfPublication: KindOfPublication) {
        const index = this.kindsOfPublication
            .map((k) => k.uuid)
            .indexOf(kindOfPublication.uuid);
        if (index !== -1) {
            this.kindsOfPublication.splice(index, 1);
            this.kindsOfPublication.splice(index, 0, kindOfPublication);
        }
    }

    create(kindOfPublication: KindOfPublication) {
        this.kindsOfPublication.push(kindOfPublication);
    }

    delete(kindOfPublication: KindOfPublication) {
        const index = this.kindsOfPublication.indexOf(kindOfPublication);
        if (index !== -1) {
            this.kindsOfPublication.splice(index, 1);
        }
    }

    loadAllKindsOfPublication(): Observable<KindOfPublication[]> {
        return of(this.kindsOfPublication);
    }

    private _generateAllKindsOfPublication(): KindOfPublication[] {
        return [
            { uuid: '1', value: 'Book' },
            { uuid: '2', value: 'Journal' },
            { uuid: '3', value: 'Magazine' },
        ];
    }
}
