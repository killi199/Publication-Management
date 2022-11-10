import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUtils } from 'src/app/helpers/test-util';

import { PublicationViewComponent } from './publication-view.component';

describe('PublicationViewComponent', () => {
    let component: PublicationViewComponent;
    let fixture: ComponentFixture<PublicationViewComponent>;

    beforeEach(async () => {
        TestUtils.utilTest();
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [PublicationViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
