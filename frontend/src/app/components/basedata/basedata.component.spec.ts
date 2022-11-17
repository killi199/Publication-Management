import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasedataAuthorsComponent } from './basedata-authors/basedata-authors.component';
import { BasedataBorrowersComponent } from './basedata-borrowers/basedata-borrowers.component';
import { BasedataKeywordsComponent } from './basedata-keywords/basedata-keywords.component';
import { BasedataKindsComponent } from './basedata-kinds/basedata-kinds.component';

import { BasedataComponent } from './basedata.component';

describe('BasedataComponent', () => {
    let component: BasedataComponent;
    let fixture: ComponentFixture<BasedataComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatTabsModule,
                MatSnackBarModule,
                MatFormFieldModule,
                MatInputModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
                MatTableModule,
                MatIconModule,
                FormsModule,
            ],
            declarations: [
                BasedataComponent,
                BasedataKindsComponent,
                BasedataKeywordsComponent,
                BasedataBorrowersComponent,
                BasedataAuthorsComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BasedataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
