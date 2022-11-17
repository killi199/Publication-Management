import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PublicationService } from './publication.service';

describe('PublicationService', () => {
    let service: PublicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(PublicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
