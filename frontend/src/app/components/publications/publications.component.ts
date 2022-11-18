import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Author } from 'src/app/models/author';
import { Keyword } from 'src/app/models/keyword';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { Publication } from 'src/app/models/publication';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AuthorService } from 'src/app/services/author.service';
import { KeywordService } from 'src/app/services/keyword.service';
import { KindOfPublicationService } from 'src/app/services/kind-of-publication.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
    publications: Observable<Publication[]>;
    assignments: Observable<Assignment[]> = new Observable<Assignment[]>();
    keywords: Keyword[] = [];
    authors: Author[] = [];
    kindsOfPublication: KindOfPublication[] = [];
    currentPublication?: Publication;
    openPublication: boolean = false;
    addingPublication: boolean = false;

    constructor(
        private publicationService: PublicationService,
        private keywordService: KeywordService,
        private kindOfPublicationService: KindOfPublicationService,
        private authorService: AuthorService,
        private assignmentService: AssignmentService
    ) {
        this.publications = publicationService.getAll();
    }

    ngOnInit(): void {
        this.keywordService
            .getAll()
            .subscribe((keywords) => (this.keywords = keywords));
        this.authorService
            .getAll()
            .subscribe((authors) => (this.authors = authors));
        this.kindOfPublicationService
            .loadAllKindsOfPublication()
            .subscribe(
                (kindsOfPublication) =>
                    (this.kindsOfPublication = kindsOfPublication)
            );
    }

    onSelectPublication(publication: Publication): void {
        this.currentPublication = publication;

        if(publication?.key){
            this.assignments = this.assignmentService.loadAssignments(publication.key);
        }
    }

    onEditPublication(): void {
        this.addingPublication = false;
        this.openPublication = !this.openPublication;
    }

    onAddPublication(): void {
        this.addingPublication = true;
        this.currentPublication = undefined;
        this.openPublication = !this.openPublication;
    }

    onDeletePublication(publication: Publication): void {
        this.publicationService.delete(publication).subscribe(() => {
            this.currentPublication = undefined;
            this.openPublication = false;
        });
    }

    onSavePublication(publication: Publication): void {
        if (this.addingPublication) {
            this.publicationService.create(publication).subscribe();
        } else {
            this.publicationService.update(publication).subscribe();
        }
    }

    onBack(): void {
        this.openPublication = false;
        this.addingPublication = false;
        this.currentPublication = undefined;
    }
}
