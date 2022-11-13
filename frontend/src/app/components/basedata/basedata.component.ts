import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from 'src/app/models/author';
import { Borrower } from 'src/app/models/borrower';
import { Keyword } from 'src/app/models/keyword';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { KindOfPublicationService } from 'src/app/services/kind-of-publication.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-basedata',
    templateUrl: './basedata.component.html',
    styleUrls: ['./basedata.component.scss'],
})
export class BasedataComponent {
    kindOfPubs$: Observable<KindOfPublication[]>;
    keywords$: Observable<Keyword[]>;
    authors$: Observable<Author[]>;
    borrowers$: Observable<Borrower[]>;

    constructor(
        private publicationService: PublicationService,
        private kindOfPubService: KindOfPublicationService
    ) {
        this.kindOfPubs$ = kindOfPubService.loadAllKindsOfPublication();
        this.keywords$ = publicationService.loadKeywords();
        this.authors$ = publicationService.loadAuthors();
        this.borrowers$ = publicationService.loadBorrowers();
    }

    onDeleteKindOfPublication(kindOfPublication: KindOfPublication) {
        this.kindOfPubService.delete(kindOfPublication);
    }

    onCreateKindOfPublication(kindOfPublication: KindOfPublication) {
        this.kindOfPubService.create(kindOfPublication);
    }

    onUpdateKindOfPublication(kindOfPublication: KindOfPublication) {
        this.kindOfPubService.update(kindOfPublication);
    }
}
