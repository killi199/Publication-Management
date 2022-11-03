import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from 'src/app/models/author';
import { Borrower } from 'src/app/models/borrower';
import { Keyword } from 'src/app/models/keyword';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-basedata',
    templateUrl: './basedata.component.html',
    styleUrls: ['./basedata.component.scss'],
})
export class BasedataComponent implements OnInit {
    kindOfPubs$: Observable<KindOfPublication[]>;
    keywords$: Observable<Keyword[]>;
    authors$: Observable<Author[]>;
    borrowers$: Observable<Borrower[]>;

    constructor(publicationService: PublicationService) {
        this.kindOfPubs$ = publicationService.loadKindOfPublications();
        this.keywords$ = publicationService.loadKeywords();
        this.authors$ = publicationService.loadBorrowers();
        this.borrowers$ = publicationService.loadAuthors();
    }

    ngOnInit(): void {}
}
