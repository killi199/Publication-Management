import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AssignmentService } from './assignment.service';

describe('AssignmentService', () => {
    let service: AssignmentService;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [MatSnackBarModule, HttpClientTestingModule] });
        service = TestBed.inject(AssignmentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
