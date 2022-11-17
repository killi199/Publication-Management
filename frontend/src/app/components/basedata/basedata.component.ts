import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from 'src/app/models/author';
import { Borrower } from 'src/app/models/borrower';
import { Keyword } from 'src/app/models/keyword';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { AuthorService } from 'src/app/services/author.service';
import { BorrowerService } from 'src/app/services/borrower.service';
import { KeywordService } from 'src/app/services/keyword.service';
import { KindOfPublicationService } from 'src/app/services/kind-of-publication.service';

@Component({
    selector: 'app-basedata',
    templateUrl: './basedata.component.html',
    styleUrls: ['./basedata.component.scss'],
})
export class BasedataComponent {
    kindOfPubs: Observable<KindOfPublication[]>;
    keywords: Observable<Keyword[]>;
    authors: Observable<Author[]>;
    borrowers: Observable<Borrower[]>;

    constructor(
        private kindOfPubService: KindOfPublicationService,
        private keywordService: KeywordService,
        private borrowerService: BorrowerService,
        private authorService: AuthorService
    ) {
        this.kindOfPubs = kindOfPubService.loadAllKindsOfPublication();
        this.keywords = keywordService.loadAllKeywords();
        this.authors = authorService.getAll();
        this.borrowers = borrowerService.getAll();
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

    onDeleteKeyword(keyword: Keyword) {
        this.keywordService.delete(keyword);
    }

    onCreateKeyword(keyword: Keyword) {
        this.keywordService.create(keyword);
    }

    onUpdateKeyword(keyword: Keyword) {
        this.keywordService.update(keyword);
    }

    onDeleteBorrower(borrower: Borrower) {
        this.borrowerService.delete(borrower);
    }

    onCreateBorrower(borrower: Borrower) {
        this.borrowerService.create(borrower);
    }

    onUpdateBorrower(borrower: Borrower) {
        this.borrowerService.update(borrower);
    }

    deleteAuthor = (author: Author): Observable<any> => {
        return this.authorService.delete(author);
    }

    createAuthor = (author: Author): Observable<Author> => {
        return this.authorService.create(author);
    }

    updateAuthor = (author: Author): Observable<Author> => {
        return this.authorService.update(author);
    }
}
