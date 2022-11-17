import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { Borrower } from 'src/app/models/borrower';

@Component({
    selector: 'app-assignment-view',
    templateUrl: './assignment-view.component.html',
    styleUrls: ['./assignment-view.component.scss'],
})
export class AssignmentViewComponent implements OnInit {
    @Input()
    assignment: Assignment = {};

    @Input()
    allBorrowers: Borrower[] = [];

    @Input()
    allPublicationKeys: string[] = [];

    @Input()
    extendAssignment?: (assignment: Assignment) => Observable<Assignment>;

    @Input()
    isAssignmentExtandable?: (assignment: Assignment) => Observable<boolean>;

    @Input()
    update?: (assignment: Assignment) => Observable<Assignment>;

    formGroup = new FormGroup({
        publicationKey: new FormControl<string>(''),
        dateOfAssignment: new FormControl<Date>(new Date()),
        dateOfReturn: new FormControl<Date>(new Date()),
        borrower: new FormControl<string | Borrower>(''),
    });

    filteredBorrowers: Observable<Borrower[]> = new Observable<Borrower[]>();

    filteredPublicationKeys: Observable<string[]> = new Observable<string[]>();

    ngOnInit(): void {
        if (this.assignment) {
            this.formGroup.disable();
            this.formGroup.patchValue(this.assignment);
        }

        this._reloadView();
    }

    onSubmit(): void {}

    onExtend(): void {
        this.extendAssignment!(this.assignment).subscribe((a) => {
            this.formGroup.patchValue(a);
        });
    }

    onCancel(): void {
        this.formGroup.reset();
        this._reloadView();
    }

    onReturn(): void {
        this.assignment.dateOfReturn = new Date();
        console.log(this.assignment.dateOfReturn);
        this.update!(this.assignment).subscribe((a) => {
            this.formGroup.patchValue(a);
        });
    }

    displayBorrower(borrower: Borrower): string {
        return borrower?.surname && borrower?.name
            ? borrower.surname + ' ' + borrower.name
            : '';
    }

    private _filterBorrowers(value: string): Borrower[] {
        const filterValue = value.toLowerCase();

        return this.allBorrowers.filter(
            (borrower) =>
                borrower.surname?.toLowerCase().includes(filterValue) ||
                borrower.name?.toLowerCase().includes(filterValue)
        );
    }

    private _filterPublicationKeys(value: string): string[] {
        const filterValue = value.toLowerCase();
    
        return this.allPublicationKeys.filter(option => option.toLowerCase().includes(filterValue));
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

            this.filteredPublicationKeys = this.formGroup.get('publicationKey')!.valueChanges.pipe(
                startWith(''),
                map(publicationKey => this._filterPublicationKeys(publicationKey || '')),
              );
    }
}
