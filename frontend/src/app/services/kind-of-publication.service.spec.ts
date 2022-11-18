import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { KindOfPublicationService } from './kind-of-publication.service';

describe('KindOfPublicationService', () => {
    let service: KindOfPublicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(KindOfPublicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
