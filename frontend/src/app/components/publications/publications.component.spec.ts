import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationsComponent } from './publications.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PublicationsComponent', () => {
    let component: PublicationsComponent;
    let fixture: ComponentFixture<PublicationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PublicationsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
