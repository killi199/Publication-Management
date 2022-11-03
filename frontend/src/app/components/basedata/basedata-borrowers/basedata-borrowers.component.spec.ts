import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedataBorrowersComponent } from './basedata-borrowers.component';

describe('BasedataBorrowersComponent', () => {
  let component: BasedataBorrowersComponent;
  let fixture: ComponentFixture<BasedataBorrowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasedataBorrowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasedataBorrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
