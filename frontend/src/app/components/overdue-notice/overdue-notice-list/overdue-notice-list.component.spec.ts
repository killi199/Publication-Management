import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueNoticeListComponent } from './overdue-notice-list.component';

describe('OverdueNoticeListComponent', () => {
  let component: OverdueNoticeListComponent;
  let fixture: ComponentFixture<OverdueNoticeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdueNoticeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdueNoticeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
