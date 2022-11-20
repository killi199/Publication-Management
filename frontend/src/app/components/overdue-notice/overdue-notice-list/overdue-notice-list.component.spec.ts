import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OverdueNoticeListComponent } from './overdue-notice-list.component';

describe('OverdueNoticeListComponent', () => {
    let component: OverdueNoticeListComponent;
    let fixture: ComponentFixture<OverdueNoticeListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
                MatSnackBarModule,
            ],
            declarations: [OverdueNoticeListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OverdueNoticeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
