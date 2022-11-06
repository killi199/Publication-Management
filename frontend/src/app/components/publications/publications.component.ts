import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Keyword } from 'src/app/models/keyword';
import { Publication } from 'src/app/models/publication';
import { KeywordService } from 'src/app/services/keyword.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
    publications$: Observable<Publication[]>;
    keywords: Keyword[] = [];
    keywordsString: string[] = [];
    currentPublication?: Publication;
    openPublication: boolean = false;

    constructor(
        private publicationService: PublicationService,
        private keywordService: KeywordService
    ) {
        this.publications$ = publicationService.loadAllPublications();
    }

    ngOnInit(): void {
        this.keywordService
            .loadAllKeywords()
            .subscribe((keywords) => (this.keywords = keywords));
        this.keywordsString = this.keywords
            .map((keyword) => keyword.value)
            .filter(this._notEmpty);
    }

    onSelectPublication(publication: Publication): void {
        this.currentPublication = publication;
    }

    onShowPublication(): void {
        this.openPublication = !this.openPublication;
    }

    onDeletePublication(publication: Publication): void {
        this.publicationService.deletePublication(publication);
    }

    onSavePublication(publication: Publication): void {
        this.publicationService.savePublication(publication);
    }

    private _notEmpty<TValue>(
        value: TValue | null | undefined
    ): value is TValue {
        return value !== null && value !== undefined;
    }
}
