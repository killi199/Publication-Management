import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { BasedataKindsComponent } from './basedata-kinds.component';

describe('BasedataKindsComponent', () => {
  let component: BasedataKindsComponent;
  let fixture: ComponentFixture<BasedataKindsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatSnackBarModule],
      declarations: [ BasedataKindsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasedataKindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
