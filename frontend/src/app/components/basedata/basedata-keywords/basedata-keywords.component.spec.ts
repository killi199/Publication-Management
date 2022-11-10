import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
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
