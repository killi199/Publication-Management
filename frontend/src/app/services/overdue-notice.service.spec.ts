import { TestBed } from '@angular/core/testing';

import { OverdueNoticeService } from './overdue-notice.service';

describe('OverdueNoticeService', () => {
  let service: OverdueNoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverdueNoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
