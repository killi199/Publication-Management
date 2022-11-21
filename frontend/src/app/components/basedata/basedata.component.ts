// Author: Marcel Dymarz
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
    styleUrls: ['../../helpers/core-component.scss', './basedata.component.scss'],
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
        this.kindOfPubs = kindOfPubService.getAll();
        this.keywords = keywordService.getAll();
        this.authors = authorService.getAll();
        this.borrowers = borrowerService.getAll();
    }

    deleteKindOfPublication = (kindOfPublication: KindOfPublication): Observable<any> => {
        return this.kindOfPubService.delete(kindOfPublication);
    }

    createKindOfPublication = (kindOfPublication: KindOfPublication): Observable<KindOfPublication> => {
        return this.kindOfPubService.create(kindOfPublication);
    }

    updateKindOfPublication = (kindOfPublication: KindOfPublication): Observable<KindOfPublication> => {
        return this.kindOfPubService.update(kindOfPublication);
    }

    deleteKeyword = (keyword: Keyword): Observable<any> => {
        return this.keywordService.delete(keyword);
    }

    createKeyword = (keyword: Keyword): Observable<Keyword> => {
        return this.keywordService.create(keyword);
    }

    updateKeyword = (keyword: Keyword): Observable<Keyword> => {
        return this.keywordService.update(keyword);
    }

    deleteBorrower = (borrower: Borrower): Observable<any> => {
        return this.borrowerService.delete(borrower);
    }

    createBorrower = (borrower: Borrower): Observable<Borrower> => {
        return this.borrowerService.create(borrower);
    }

    updateBorrower = (borrower: Borrower): Observable<Borrower> => {
        return this.borrowerService.update(borrower);
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
