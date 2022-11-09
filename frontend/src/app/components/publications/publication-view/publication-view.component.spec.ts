import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationViewComponent } from './publication-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
            ],
            declarations: [PublicationViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
