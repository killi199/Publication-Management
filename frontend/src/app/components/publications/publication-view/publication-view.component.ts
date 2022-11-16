import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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

    separatorKeysCodes: number[] = [ENTER, COMMA];

    formGroup = new FormGroup({
        key: new FormControl<string>(''),
        title: new FormControl<string>(''),
        authors: new FormControl<Author[]>([]),
        isbn: new FormControl<string>(''),
        quantity: new FormControl<number>(0),
        publisher: new FormControl<string>(''),
        dateOfPublication: new FormControl<Date>(new Date()),
        kindsOfPublication: new FormControl<string | KindOfPublication>(''),
        keywords: new FormControl<Keyword[]>([]),
    });

    keywordControl = new FormControl<string | Keyword>('');

    authorControl = new FormControl<string | Author>('');

    filteredKeywords: Observable<Keyword[]> = new Observable<Keyword[]>();

    filteredAuthors: Observable<Author[]> = new Observable<Author[]>();

    filteredKindsOfPublication: Observable<KindOfPublication[]> =
        new Observable<KindOfPublication[]>();

    ngOnInit(): void {
        if (this.publication) {
            this.formGroup.disable();
            this.formGroup.patchValue(this.publication);
        }

        this._reloadView();
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.publication);
    }

    onSubmit(): void {
        if (!this.formGroup.valid) return;

        console.log(this.formGroup.value);

        const kindOfPublication =
            this.formGroup.get('kindsOfPublication')!.value;

        if (kindOfPublication) {
            this._setValueToKindOfPublication(kindOfPublication);
        } else {
            this.publication.kindOfPublication = undefined;
        }

        this.savePublication.emit(this.publication);
        this.formGroup.disable();
    }

    onCancel(): void {
        this.formGroup.disable();
        this.formGroup.reset();
        this._reloadView();
    }

    onEdit(): void {
        this.formGroup.enable();
    }

    removeKeyword(keyword: Keyword): void {
        if (this.publication.keywords) {
            const index = this.publication.keywords.indexOf(keyword);

            if (index >= 0) {
                this.publication.keywords?.splice(index, 1);
            }
        }
    }

    removeAuthor(author: Author): void {
        if (this.publication.authors) {
            const index = this.publication.authors.indexOf(author);

            if (index >= 0) {
                this.publication.authors?.splice(index, 1);
            }
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        if (!this.publication.keywords) return;

        const value = (event.value || '').trim();

        const keywords = this._filterKeywords(value as string);
        if (keywords.length === 1) {
            this.publication.keywords.push(keywords[0]);
        } else {
            const keyword = new Keyword();
            keyword.value = value;
            this.publication.keywords.push(keyword);
        }

        event.chipInput!.clear();
        this.keywordControl.setValue('');
    }

    addAuthor(event: MatChipInputEvent): void {
        if (!this.publication.authors) return;

        const value = (event.value || '').trim();
        const authors = this._filterAuthors(value as string);

        if (authors.length === 1) {
            this.publication.authors.push(authors[0]);
        } else {
            const author = new Author();
            author.surname = value.split(' ')[0];
            author.name = value.split(' ')[1];
            this.publication.authors.push(author);
        }

        event.chipInput!.clear();
        this.authorControl.setValue('');
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
        return kindOfPublication?.value ?? '';
    }

    displayKeyword(keyword: Keyword): string {
        return keyword?.value ?? '';
    }

    displayAuthor(author: Author): string {
        return author?.surname && author?.name
            ? author.surname + author.name
            : '';
    }

    private _filterKeywords(value: string): Keyword[] {
        const filterValue = value.toLowerCase();

        return this.allKeywords.filter((keyword) =>
            keyword.value?.toLowerCase().includes(filterValue)
        );
    }

    private _filterAuthors(value: string): Author[] {
        const filterValue = value.toLowerCase();

        return this.allAuthors.filter(
            (author) =>
                author.surname?.toLowerCase().includes(filterValue) ||
                author.name?.toLowerCase().includes(filterValue)
        );
    }

    private _filterKindsOfPublication(value: string): KindOfPublication[] {
        const filterValue = value.toLowerCase();

        return this.allKindsOfPublication.filter((kindOfPublication) =>
            kindOfPublication.value?.toLowerCase().includes(filterValue)
        );
    }

    private _reloadView(): void {
        this.filteredKeywords = this.keywordControl.valueChanges.pipe(
            startWith(''),
            map((keyword) => {
                const value =
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

        this.filteredKindsOfPublication = this.formGroup
            .get('kindsOfPublication')!
            .valueChanges.pipe(
                startWith(''),
                map((kindOfPublication) => {
                    const value =
                        typeof kindOfPublication === 'string'
                            ? kindOfPublication
                            : kindOfPublication?.value;
                    return value
                        ? this._filterKindsOfPublication(value as string)
                        : this.allKindsOfPublication.slice();
                })
            );

        if (
            this.publication.kindOfPublication
        ) {
            this.formGroup.patchValue({
                kindsOfPublication: this.publication.kindOfPublication,
            });
        }
    }

    private _setValueToKindOfPublication(
        value: string | KindOfPublication
    ): void {
        if (typeof value === 'string') {
            this.publication.kindOfPublication = new KindOfPublication();
            this.publication.kindOfPublication.value = value;
        } else {
            this.publication.kindOfPublication = value;
        }
    }
}
