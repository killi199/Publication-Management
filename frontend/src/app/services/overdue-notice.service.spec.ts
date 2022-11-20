import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { OverdueNoticeService } from './overdue-notice.service';

describe('OverdueNoticeService', () => {
    let service: OverdueNoticeService;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule, MatSnackBarModule] });
        service = TestBed.inject(OverdueNoticeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
