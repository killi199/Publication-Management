import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KindOfPublication } from '../models/kind-of-publication';

@Injectable({
    providedIn: 'root',
})
export class KindOfPublicationService {
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
