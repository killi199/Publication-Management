import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Keyword } from 'src/app/models/keyword';
import { Publication } from 'src/app/models/publication';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { Author } from 'src/app/models/author';

@Component({
    selector: 'app-publication-view',
    templateUrl: './publication-view.component.html',
    styleUrls: ['./publication-view.component.scss'],
})
export class PublicationViewComponent implements OnInit {
    @ViewChild('form')
    form!: NgForm;

    @ViewChild('keywordInput')
    keywordInput!: ElementRef<HTMLInputElement>;

    @ViewChild('authorInput')
    authorInput!: ElementRef<HTMLInputElement>;

    @Input()
    publication: Publication = new Publication();

    @Input()
    allKeywords: Keyword[] = [];

    @Input()
    allAuthors: Author[] = [];

    @Input()
    allKindsOfPublication: KindOfPublication[] = [];

    @Output()
    deletePublication = new EventEmitter<Publication>();

    @Output()
    savePublication = new EventEmitter<Publication>();

    editable: boolean = false;

    savedPublication: Publication = new Publication();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    keywordControl = new FormControl<string | Keyword>('');

    authorControl = new FormControl<string | Author>('');

    kindOfPublicationControl = new FormControl<string | KindOfPublication>('');

    filteredKeywords: Observable<Keyword[]> = new Observable<Keyword[]>();

    filteredAuthors: Observable<Author[]> = new Observable<Author[]>();

    filteredKindsOfPublication: Observable<KindOfPublication[]> =
        new Observable<KindOfPublication[]>();

    constructor() {}

    ngOnInit(): void {
        if (!this.publication) {
            this.editable = true;
        } else {
            this.savedPublication = structuredClone(this.publication);
        }

        this._reloadView();
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.publication);
    }

    onSubmit(): void {
        if (this.form.valid) {
            if (this.kindOfPublicationControl.value) {
                if (typeof this.kindOfPublicationControl.value === 'string') {
                    this.publication.kindOfPublication =
                        new KindOfPublication();
                    this.publication.kindOfPublication.value =
                        this.kindOfPublicationControl.value;
                } else {
                    this.publication.kindOfPublication =
                        this.kindOfPublicationControl.value;
                }
            } else {
                this.publication.kindOfPublication = undefined;
            }

            this.savedPublication = structuredClone(this.publication);
            this.savePublication.emit(this.publication);
            this.editable = false;
        }
    }

    onCancel(): void {
        this.editable = false;
        this.publication = structuredClone(this.savedPublication);
        this._reloadView();
    }

    onEdit(): void {
        this.editable = true;
    }

    removeKeyword(keyword: Keyword): void {
        if (this.publication.keywords) {
            let index = this.publication.keywords.indexOf(keyword);

            if (index >= 0) {
                this.publication.keywords?.splice(index, 1);
            }
        }
    }

    removeAuthor(author: Author): void {
        if (this.publication.authors) {
            let index = this.publication.authors.indexOf(author);

            if (index >= 0) {
                this.publication.authors?.splice(index, 1);
            }
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        if (this.publication.keywords) {
            let value = (event.value || '').trim();

            let keywords = this._filterKeywords(value as string);
            if (keywords.length === 1) {
                this.publication.keywords.push(keywords[0]);
            } else {
                let keyword = new Keyword();
                keyword.value = value;

                if (value) {
                    this.publication.keywords.push(keyword);
                }
            }

            event.chipInput!.clear();
            this.keywordControl.setValue('');
        }
    }

    addAuthor(event: MatChipInputEvent): void {
        if (this.publication.authors) {
            let value = (event.value || '').trim();

            let authors = this._filterAuthors(value as string);
            if (authors.length === 1) {
                this.publication.authors.push(authors[0]);
            } else {
                let author = new Author();
                author.surname = value.split(' ')[0];
                author.name = value.split(' ')[1];

                if (value) {
                    this.publication.authors.push(author);
                }
            }

            event.chipInput!.clear();
            this.authorControl.setValue('');
        }
    }

    selectedKeyword(event: MatAutocompleteSelectedEvent): void {
        if (this.publication.keywords) {
            this.publication.keywords.push(event.option.value);
            this.keywordInput.nativeElement.value = '';
            this.keywordControl.setValue('');
        }
    }

    selectedAuthor(event: MatAutocompleteSelectedEvent): void {
        if (this.publication.authors) {
            this.publication.authors.push(event.option.value);
            this.authorInput.nativeElement.value = '';
            this.authorControl.setValue('');
        }
    }

    displayKindOfPublication(kindOfPublication: KindOfPublication): string {
        return kindOfPublication && kindOfPublication.value
            ? kindOfPublication.value
            : '';
    }

    displayKeyword(keyword: Keyword): string {
        return keyword && keyword.value ? keyword.value : '';
    }

    displayAuthor(author: Author): string {
        return author && author.surname && author.name
            ? author.surname + author.name
            : '';
    }

    private _filterKeywords(value: string): Keyword[] {
        let filterValue = value.toLowerCase();

        return this.allKeywords.filter((keyword) =>
            keyword.value?.toLowerCase().includes(filterValue)
        );
    }

    private _filterAuthors(value: string): Author[] {
        let filterValue = value.toLowerCase();

        return this.allAuthors.filter(
            (author) =>
                author.surname?.toLowerCase().includes(filterValue) &&
                author.name?.toLowerCase().includes(filterValue)
        );
    }

    private _filterKindsOfPublication(value: string): KindOfPublication[] {
        let filterValue = value.toLowerCase();

        return this.allKindsOfPublication.filter((kindOfPublication) =>
            kindOfPublication.value?.toLowerCase().includes(filterValue)
        );
    }

    private _reloadView(): void {
        this.filteredKeywords = this.keywordControl.valueChanges.pipe(
            startWith(''),
            map((keyword) => {
                let value =
                    typeof keyword === 'string' ? keyword : keyword?.value;
                return value
                    ? this._filterKeywords(value as string)
                    : this.allKeywords.slice();
            })
        );

        this.filteredAuthors = this.authorControl.valueChanges.pipe(
            startWith(''),
            map((author) => {
                let value = '';

                if (typeof author === 'string') {
                    value = author;
                } else if (author?.surname && author?.name) {
                    value = author?.surname + author?.name;
                }

                return value
                    ? this._filterAuthors(value as string)
                    : this.allAuthors.slice();
            })
        );

        this.filteredKindsOfPublication =
            this.kindOfPublicationControl.valueChanges.pipe(
                startWith(''),
                map((kindOfPublication) => {
                    let value =
                        typeof kindOfPublication === 'string'
                            ? kindOfPublication
                            : kindOfPublication?.value;
                    return value
                        ? this._filterKindsOfPublication(value as string)
                        : this.allKindsOfPublication.slice();
                })
            );

        if (this.publication.kindOfPublication) {
            this.kindOfPublicationControl.setValue(
                this.publication.kindOfPublication
            );
        }
    }
}
