import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BorrowerService } from './borrower.service';

describe('BorrowerService', () => {
    let service: BorrowerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(BorrowerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
