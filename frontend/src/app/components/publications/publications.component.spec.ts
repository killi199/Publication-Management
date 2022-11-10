import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationViewComponent } from './publication-view/publication-view.component';

import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
    let component: PublicationsComponent;
    let fixture: ComponentFixture<PublicationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                PublicationsComponent,
                PublicationViewComponent,
                PublicationListComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
