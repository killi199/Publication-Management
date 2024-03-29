// Author: Kevin Jahrens
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Keyword } from 'src/app/models/keyword';
import { Publication } from 'src/app/models/publication';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { Author } from 'src/app/models/author';
import { Snackbar } from 'src/app/helpers/snackbar';
import { Assignment } from 'src/app/models/assignment';

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
    publication?: Publication;

    @Input()
    allKeywords: Keyword[] = [];

    @Input()
    allAuthors: Author[] = [];

    @Input()
    allKindsOfPublication: KindOfPublication[] = [];

    @Input()
    addingPublication?: boolean;

    @Input()
    assignments: Observable<Assignment[]> = new Observable<Assignment[]>();

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
        kindOfPublication: new FormControl<KindOfPublication | undefined>(undefined),
        keywords: new FormControl<Keyword[]>([]),
    });

    keywordControl = new FormControl<string | Keyword>('');

    authorControl = new FormControl<string | Author>('');

    filteredKeywords: Observable<Keyword[]> = new Observable<Keyword[]>();

    filteredAuthors: Observable<Author[]> = new Observable<Author[]>();

    filteredKindsOfPublication: Observable<KindOfPublication[]> = new Observable<KindOfPublication[]>();

    clonedPublication: Publication = {};

    hasAssignments: boolean = false;

    constructor(private snackBar: Snackbar) {
        this.assignments.subscribe((a) => (this.hasAssignments = a.length > 0));
    }

    ngOnInit(): void {
        if (this.publication) {
            this.formGroup.disable();
            this.formGroup.patchValue(this.publication);
            this.clonedPublication = structuredClone(this.publication);
        }

        this._reloadView();
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.formGroup.getRawValue());
        this.snackBar.open('Publikation gelöscht!');
    }

    onSubmit(): void {
        if (!this.formGroup.valid) return;

        if (typeof this.formGroup.value.kindOfPublication === 'string') {
            this.formGroup.value.kindOfPublication = this.getCorrectKindOfPublication(
                this.formGroup.value.kindOfPublication
            );
        }

        const toSave = this.formGroup.value;
        toSave.key = this.formGroup.get('key')?.value;

        this.savePublication.emit(toSave);
        this.clonedPublication = structuredClone(toSave);

        const crudOperation = this.addingPublication ? ' erstellt!' : ' geändert!';
        this.snackBar.open('Publikation ' + crudOperation);

        this.formGroup.disable();
    }

    getCorrectKindOfPublication(kindOfPublication: string): KindOfPublication {
        const value = kindOfPublication.trim();
        const filteredKindsOfPublication = this._filterKindsOfPublication(value as string);
        if (filteredKindsOfPublication.length === 1) {
            return filteredKindsOfPublication[0];
        }

        return { value: kindOfPublication } as KindOfPublication;
    }

    onCancel(): void {
        this.formGroup.disable();
        if (this.publication) {
            this.formGroup.patchValue(this.clonedPublication);
        } else {
            this.formGroup.reset();
        }
        this._reloadView();
        this.snackBar.open('Nichts geändert!');
    }

    onEdit(): void {
        this.formGroup.enable();
        this.formGroup.get('key')?.disable();
    }

    removeKeyword(keyword: Keyword): void {
        const keywords = this.formGroup.value.keywords;
        if (!keywords) return;

        const index = keywords.indexOf(keyword);
        if (index >= 0) {
            keywords.splice(index, 1);
        }
    }

    removeAuthor(author: Author): void {
        const authors = this.formGroup.value.authors;
        if (!authors) return;

        const index = authors.indexOf(author);
        if (index >= 0) {
            authors.splice(index, 1);
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        const keywords = this.formGroup.value.keywords;
        if (!keywords) return;

        const value = (event.value || '').trim();
        const filteredKeywords = this._filterKeywords(value as string);

        if (filteredKeywords.length === 1) {
            keywords.push(filteredKeywords[0]);
        } else {
            keywords.push({ value: value });
        }

        event.chipInput!.clear();
        this.keywordControl.setValue('');
    }

    addAuthor(event: MatChipInputEvent): void {
        const authors = this.formGroup.value.authors;
        if (!authors) return;

        const value = (event.value || '').trim();
        const filteredAuthors = this._filterAuthors(value as string);

        if (filteredAuthors.length === 1) {
            authors.push(filteredAuthors[0]);
        } else {
            const surname = value.split(' ')[0];
            const name = value.split(' ')[1];
            authors.push({ surname: surname, name: name });
        }

        event.chipInput!.clear();
        this.authorControl.setValue('');
    }

    selectedKeyword(event: MatAutocompleteSelectedEvent): void {
        const keywords = this.formGroup.value.keywords;
        if (!keywords) return;

        keywords.push(event.option.value);
        this.keywordInput.nativeElement.value = '';
        this.keywordControl.setValue('');
    }

    selectedAuthor(event: MatAutocompleteSelectedEvent): void {
        const authors = this.formGroup.value.authors;
        if (!authors) return;

        authors.push(event.option.value);
        this.authorInput.nativeElement.value = '';
        this.authorControl.setValue('');
    }

    displayKindOfPublication(kindOfPublication: KindOfPublication): string {
        return kindOfPublication?.value ?? '';
    }

    private _filterKeywords(value: string): Keyword[] {
        const filterValue = value.toLowerCase();

        return this.allKeywords.filter((keyword) => keyword.value?.toLowerCase().includes(filterValue));
    }

    private _filterAuthors(value: string): Author[] {
        const filterValue = value.toLowerCase();

        return this.allAuthors.filter(
            (author) =>
                (author.surname + ' ' + author.name).toLowerCase().includes(filterValue) ||
                (author.name + ' ' + author.surname).toLowerCase().includes(filterValue)
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
                const value = typeof keyword === 'string' ? keyword : keyword?.value;
                return value ? this._filterKeywords(value as string) : this.allKeywords.slice();
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

                return value ? this._filterAuthors(value as string) : this.allAuthors.slice();
            })
        );

        this.filteredKindsOfPublication = this.formGroup.get('kindOfPublication')!.valueChanges.pipe(
            startWith(''),
            map((kindOfPublication) => {
                const value = typeof kindOfPublication === 'string' ? kindOfPublication : kindOfPublication?.value;
                return value ? this._filterKindsOfPublication(value as string) : this.allKindsOfPublication.slice();
            })
        );
    }
}
