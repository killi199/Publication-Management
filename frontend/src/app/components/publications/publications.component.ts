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
export class PublicationsComponent {
    publications$: Observable<Publication[]>;
    keywords: Observable<Keyword[]>;
    currentPublication?: Publication;
    openPublication: boolean = false;
    
    constructor(private publicationService: PublicationService, keywordService: KeywordService) {
        this.publications$ = publicationService.loadAllPublications();
        this.keywords = keywordService.loadAllKeywords();
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
}
