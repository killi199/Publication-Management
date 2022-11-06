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
    allkeywords: string[] = [];

    @Output()
    deletePublication = new EventEmitter<Publication>();

    @Output()
    savePublication = new EventEmitter<Publication>();

    editable: boolean = false;

    savedPublication: Publication = new Publication();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    keywordCtrl = new FormControl('');

    filteredKeywords: Observable<string[]>;

    constructor() {
        this.filteredKeywords = this.keywordCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) =>
                fruit ? this._filter(fruit) : this.allkeywords.slice()
            )
        );
    }

    ngOnInit(): void {
        if (!this.publication) {
            this.editable = true;
        } else {
            this.savedPublication = structuredClone(this.publication);
        }
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.publication);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.savePublication.emit(this.publication);
            this.editable = false;
        }
    }

    onCancel(): void {
        this.editable = false;
        this.publication = structuredClone(this.savedPublication);
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
        console.log(event.value);
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

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allkeywords.filter((keyword) =>
            keyword.toLowerCase().includes(filterValue)
        );
    }
}
