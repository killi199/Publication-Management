import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AssignmentViewComponent } from './assignment-view.component';

describe('AssignmentViewComponent', () => {
    let component: AssignmentViewComponent;
    let fixture: ComponentFixture<AssignmentViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                MatAutocompleteModule,
                MatDatepickerModule,
                MatNativeDateModule,
                FormsModule,
                ReactiveFormsModule,
                MatIconModule,
                BrowserAnimationsModule,
            ],
            declarations: [AssignmentViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AssignmentViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
