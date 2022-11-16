import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationViewComponent } from './publication-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AssignmentListComponent } from '../../assignments/assignment-list/assignment-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('PublicationViewComponent', () => {
    let component: PublicationViewComponent;
    let fixture: ComponentFixture<PublicationViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatChipsModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
                MatPaginatorModule,
                MatTableModule,
            ],
            declarations: [PublicationViewComponent, AssignmentListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
