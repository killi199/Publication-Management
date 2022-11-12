import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KindOfPublication } from '../models/kind-of-publication';

@Injectable({
    providedIn: 'root',
})
export class KindOfPublicationService {
    update(kindOfPublication: KindOfPublication) {
        const index = this.kindsOfPublication.map( k => k.uuid ).indexOf(kindOfPublication.uuid);
        if (index !== -1) {
            this.kindsOfPublication.splice(index, 1);
            this.kindsOfPublication.splice(index, 0, kindOfPublication);
        }
    }
    create(value: string) {
        const kindOfPublication = new KindOfPublication(undefined, value);
        this.kindsOfPublication.push(kindOfPublication);
    }
    delete(kindOfPublication: KindOfPublication) {
        const index = this.kindsOfPublication.indexOf(kindOfPublication);
        if (index !== -1) {
            this.kindsOfPublication.splice(index, 1);
        }
    }
    kindsOfPublication: KindOfPublication[];

    constructor() {
        this.kindsOfPublication = this.generateAllKindsOfPublication();
    }

    loadAllKindsOfPublication(): Observable<KindOfPublication[]> {
        return of(this.kindsOfPublication);
    }

    private generateAllKindsOfPublication(): KindOfPublication[] {
        let test1 = new KindOfPublication('1', 'Book');
        let test2 = new KindOfPublication('2', 'Article');
        let test3 = new KindOfPublication('3', 'Thesis');
        let test4 = new KindOfPublication('4', 'Conference');
        let test5 = new KindOfPublication('567', 'Sachbuch');
        return [test1, test2, test3, test4, test5];
    }
}
