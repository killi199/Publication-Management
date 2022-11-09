import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationListComponent } from './publication-list.component';
import { MatTableModule } from '@angular/material/table';

describe('PublicationListComponent', () => {
    let component: PublicationListComponent;
    let fixture: ComponentFixture<PublicationListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatTableModule],
            declarations: [PublicationListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
