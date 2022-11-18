import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CrudService } from './crud.service';

describe('CrudService', () => {
    let service: CrudService<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(CrudService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
