import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent {
    publications$: Observable<Publication[]>;
    currentPublication?: Publication;

    constructor(private publicationService: PublicationService) {
        this.publications$ = publicationService.loadAllPublications();
    }

    onShowPublication(publication: Publication): void {
        this.currentPublication = publication;
    }
}
