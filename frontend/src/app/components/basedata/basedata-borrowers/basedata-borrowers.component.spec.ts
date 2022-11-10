import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtils } from 'src/app/helpers/test-util';

import { BasedataBorrowersComponent } from './basedata-borrowers.component';

describe('BasedataBorrowersComponent', () => {
    let component: BasedataBorrowersComponent;
    let fixture: ComponentFixture<BasedataBorrowersComponent>;

    beforeEach(async () => {
        TestUtils.utilTest();
        await TestBed.configureTestingModule({
            imports: [
                MatPaginatorModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
            declarations: [BasedataBorrowersComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BasedataBorrowersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
