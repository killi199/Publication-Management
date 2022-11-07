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

    @Input()
    publication: Publication = new Publication();

    @Input()
    allKeywords: string[] = [];

    @Input()
    allKindsOfPublication: KindOfPublication[] = [];

    @Output()
    deletePublication = new EventEmitter<Publication>();

    @Output()
    savePublication = new EventEmitter<Publication>();

    editable: boolean = false;

    savedPublication: Publication = new Publication();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    keywordCtrl = new FormControl('');

    kindOfPublicationControl = new FormControl<string | KindOfPublication>('');

    filteredKeywords: Observable<string[]>;

    filteredKindsOfPublication: Observable<KindOfPublication[]> =
        new Observable<KindOfPublication[]>();

    constructor() {
        this.filteredKeywords = this.keywordCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) =>
                fruit ? this._filterKeywords(fruit) : this.allKeywords.slice()
            )
        );
    }

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
            const index = this.publication.keywords.indexOf(keyword);

            if (index >= 0) {
                this.publication.keywords?.splice(index, 1);
            }
        }
    }

    addKeyword(event: MatChipInputEvent): void {
        if (this.publication.keywords) {
            const value = (event.value || '').trim();

            let keyword = new Keyword();
            keyword.value = value;

            if (value) {
                this.publication.keywords.push(keyword);
            }

            event.chipInput!.clear();
            this.keywordCtrl.setValue(null);
        }
    }

    selectedKeyword(event: MatAutocompleteSelectedEvent): void {
        if (this.publication.keywords) {
            let keyword = new Keyword();
            keyword.value = event.option.viewValue;
            this.publication.keywords.push(keyword);
            this.keywordInput.nativeElement.value = '';
            this.keywordCtrl.setValue(null);
        }
    }

    displayFn(kindOfPublication: KindOfPublication): string {
        return kindOfPublication && kindOfPublication.value
            ? kindOfPublication.value
            : '';
    }

    private _filterKeywords(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allKeywords.filter((keyword) =>
            keyword.toLowerCase().includes(filterValue)
        );
    }

    private _filterKindsOfPublication(value: string): KindOfPublication[] {
        const filterValue = value.toLowerCase();

        return this.allKindsOfPublication.filter((kindOfPublicationControl) =>
            kindOfPublicationControl.value?.toLowerCase().includes(filterValue)
        );
    }

    private _reloadView(): void {
        this.filteredKindsOfPublication =
            this.kindOfPublicationControl.valueChanges.pipe(
                startWith(''),
                map((value) => {
                    const name =
                        typeof value === 'string' ? value : value?.value;
                    return name
                        ? this._filterKindsOfPublication(name as string)
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
