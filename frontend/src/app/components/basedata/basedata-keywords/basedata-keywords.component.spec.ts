import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedataKeywordsComponent } from './basedata-keywords.component';

describe('BasedataKeywordsComponent', () => {
  let component: BasedataKeywordsComponent;
  let fixture: ComponentFixture<BasedataKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasedataKeywordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasedataKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
