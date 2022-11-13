import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BasedataKeywordsComponent } from './basedata-keywords.component';

describe('BasedataKeywordsComponent', () => {
    let component: BasedataKeywordsComponent;
    let fixture: ComponentFixture<BasedataKeywordsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatPaginatorModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
                MatIconModule,
                FormsModule,
            ],
            declarations: [BasedataKeywordsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BasedataKeywordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
