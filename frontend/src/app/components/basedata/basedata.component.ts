import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from 'src/app/models/author';
import { Borrower } from 'src/app/models/borrower';
import { Keyword } from 'src/app/models/keyword';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { KeywordService } from 'src/app/services/keyword.service';
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
        publicationService: PublicationService,
        private kindOfPubService: KindOfPublicationService,
        private keywordService: KeywordService
    ) {
        this.kindOfPubs$ = kindOfPubService.loadAllKindsOfPublication();
        this.keywords$ = keywordService.loadAllKeywords();
        this.authors$ = publicationService.loadAuthors();
        this.borrowers$ = publicationService.loadBorrowers();
    }

    deleteKindOfPublication(kindOfPublication: KindOfPublication) {
        this.kindOfPubService.delete(kindOfPublication);
    }

    createKindOfPublication(kindOfPublication: KindOfPublication) {
        this.kindOfPubService.create(kindOfPublication);
    }

    updateKindOfPublication(kindOfPublication: KindOfPublication) {
        this.kindOfPubService.update(kindOfPublication);
    }

    deleteKeyword(keyword: Keyword) {
        this.keywordService.delete(keyword);
    }

    createKeyword(keyword: Keyword) {
        this.keywordService.create(keyword);
    }

    updateKeyword(keyword: Keyword) {
        this.keywordService.update(keyword);
    }
}
