import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BasedataAuthorsComponent } from './basedata-authors.component';

describe('BasedataAuthorsComponent', () => {
    let component: BasedataAuthorsComponent;
    let fixture: ComponentFixture<BasedataAuthorsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatPaginatorModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
            declarations: [BasedataAuthorsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BasedataAuthorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
