import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationListComponent } from './publication-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

describe('PublicationListComponent', () => {
    let component: PublicationListComponent;
    let fixture: ComponentFixture<PublicationListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatTableModule],
            declarations: [PublicationListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
