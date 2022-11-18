import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthorService } from './author.service';

describe('AuthorService', () => {
    let service: AuthorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(AuthorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
