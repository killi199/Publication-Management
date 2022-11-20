import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverdueNoticeListComponent } from './overdue-notice-list/overdue-notice-list.component';

import { OverdueNoticeComponent } from './overdue-notice.component';

describe('OverdueNoticeComponent', () => {
    let component: OverdueNoticeComponent;
    let fixture: ComponentFixture<OverdueNoticeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatSnackBarModule,
            ],
            declarations: [OverdueNoticeComponent, OverdueNoticeListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OverdueNoticeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
