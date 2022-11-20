import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Borrower } from 'src/app/models/borrower';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    styleUrls: ['./assignment-view.component.scss'],
})
export class AssignmentViewComponent implements OnInit {
    @Input()
    assignment?: Assignment;

    @Input()
    allBorrowers: Borrower[] = [];

    @Input()
    allPublications: Publication[] = [];

    @Input()
    extendAssignment?: (assignment: Assignment) => Observable<Assignment>;

    @Input()
    isAssignmentExtandable?: (assignment: Assignment) => Observable<boolean>;

    @Input()
    update?: (assignment: Assignment) => Observable<Assignment>;

    @Input()
    create?: (assignment: Assignment) => Observable<Assignment>;

    formGroup = new FormGroup({
        publication: new FormControl<Publication | undefined>(undefined),
        dateOfAssignment: new FormControl<Date>(new Date()),
        dateOfReturn: new FormControl<Date | undefined>({value: undefined, disabled: true}),
        latestReturnDate: new FormControl<Date | undefined>({value: undefined, disabled: true}),
        borrower: new FormControl<Borrower | undefined>(undefined),
        extensions: new FormControl<number>({value: 0, disabled: true}),
    });

    filteredBorrowers: Observable<Borrower[]> = new Observable<Borrower[]>();

    filteredPublication: Observable<Publication[]> = new Observable<Publication[]>();

    ngOnInit(): void {
        if (this.assignment) {
            this.formGroup.disable();
            this.formGroup.patchValue(this.assignment);
        }

        this._reloadView();
    }

    onSubmit(): void {
        if (!this.formGroup.valid) return;

        this.create!(this.formGroup.value).subscribe((a) => {
            this.formGroup.patchValue(a);
            this.formGroup.disable();
            this.assignment = a;
        });
        
    }

    onExtend(): void {
        if(!this.assignment) return;

        this.extendAssignment!(this.assignment).subscribe((a) => {
            this.formGroup.patchValue(a);
        });
    }

    onCancel(): void {
        this.formGroup.reset();
        this._reloadView();
    }

    onReturn(): void {
        if(!this.assignment) return;

        this.assignment.dateOfReturn = new Date();
        console.log(this.assignment.dateOfReturn);
        this.update!(this.assignment).subscribe((a) => {
            this.formGroup.patchValue(a);
        });
    }

    displayBorrower(borrower: Borrower | string): string {
        if (typeof borrower === 'string') {
            return borrower;
        }
        return borrower?.surname && borrower?.name
            ? borrower.surname + ' ' + borrower.name
            : '';
    }

    displayPublication(publication: Publication): string {
        return publication?.key ? publication.key : '';
    }

    private _filterBorrowers(value: string): Borrower[] {
        const filterValue = value.toLowerCase();

        return this.allBorrowers.filter(
            (borrower) =>
                borrower.surname?.toLowerCase().includes(filterValue) ||
                borrower.name?.toLowerCase().includes(filterValue)
        );
    }

    private _filterPublications(value: string): Publication[] {
        const filterValue = value.toLowerCase();

        return this.allPublications.filter(
            (publication) =>
            publication.key?.toLowerCase().includes(filterValue)
        );
    }
    private _reloadView(): void {
        this.filteredBorrowers = this.formGroup
            .get('borrower')!
            .valueChanges.pipe(
                startWith(''),
                map((borrower) => {
                    let value = '';

                    if (typeof borrower === 'string') {
                        value = borrower;
                    } else if (borrower?.surname && borrower?.name) {
                        value = borrower?.surname + borrower?.name;
                    }

                    return value
                        ? this._filterBorrowers(value as string)
                        : this.allBorrowers.slice();
                })
            );

            this.filteredPublication = this.formGroup
            .get('publication')!
            .valueChanges.pipe(
                startWith(''),
                map((publication) => {
                    let value = '';

                    if (typeof publication === 'string') {
                        value = publication;
                    } else if (publication?.key) {
                        value = publication?.key;
                    }

                    return value
                        ? this._filterPublications(value as string)
                        : this.allPublications.slice();
                })
            );
    }
}
