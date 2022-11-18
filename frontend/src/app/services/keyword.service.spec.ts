import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { KeywordService } from './keyword.service';

describe('KeywordService', () => {
    let service: KeywordService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(KeywordService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
