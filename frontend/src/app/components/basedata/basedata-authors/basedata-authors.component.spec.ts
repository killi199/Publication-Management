import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedataAuthorsComponent } from './basedata-authors.component';

describe('BasedataAuthorsComponent', () => {
  let component: BasedataAuthorsComponent;
  let fixture: ComponentFixture<BasedataAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasedataAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasedataAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
