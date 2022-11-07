import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Keyword } from 'src/app/models/keyword';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { Publication } from 'src/app/models/publication';
import { KeywordService } from 'src/app/services/keyword.service';
import { KindOfPublicationService } from 'src/app/services/kind-of-publication.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
    publications$: Observable<Publication[]>;
    keywords: Keyword[] = [];
    kindsOfPublication: KindOfPublication[] = [];
    currentPublication?: Publication;
    openPublication: boolean = false;

    constructor(
        private publicationService: PublicationService,
        private keywordService: KeywordService,
        private kindOfPublicationService: KindOfPublicationService
    ) {
        this.publications$ = publicationService.loadAllPublications();
    }

    ngOnInit(): void {
        this.keywordService
            .loadAllKeywords()
            .subscribe((keywords) => (this.keywords = keywords));
        this.kindOfPublicationService
            .loadAllKindsOfPublication()
            .subscribe(
                (kindsOfPublication) =>
                    (this.kindsOfPublication = kindsOfPublication)
            );
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
