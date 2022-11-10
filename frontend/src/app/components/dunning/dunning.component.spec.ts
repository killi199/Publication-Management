import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUtils } from 'src/app/helpers/test-util';

import { DunningComponent } from './dunning.component';

describe('DunningComponent', () => {
    let component: DunningComponent;
    let fixture: ComponentFixture<DunningComponent>;

    beforeEach(async () => {
        TestUtils.utilTest();
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [DunningComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DunningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
