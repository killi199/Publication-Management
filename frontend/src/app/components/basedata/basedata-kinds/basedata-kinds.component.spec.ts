import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtils } from 'src/app/helpers/test-util';

import { BasedataKindsComponent } from './basedata-kinds.component';

describe('BasedataKindsComponent', () => {
    let component: BasedataKindsComponent;
    let fixture: ComponentFixture<BasedataKindsComponent>;

    beforeEach(async () => {
        TestUtils.utilTest();
        await TestBed.configureTestingModule({
            imports: [
                MatPaginatorModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
                MatIconModule,
            ],
            declarations: [BasedataKindsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BasedataKindsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
