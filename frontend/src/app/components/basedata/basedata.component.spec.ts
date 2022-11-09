import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedataComponent } from './basedata.component';

describe('BasedataComponent', () => {
  let component: BasedataComponent;
  let fixture: ComponentFixture<BasedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ BasedataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
