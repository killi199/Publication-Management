import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestUtils } from '../helpers/test-util';

import { PublicationService } from './publication.service';

describe('PublicationService', () => {
    let service: PublicationService;

    beforeEach(() => {
        TestUtils.utilTest();
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(PublicationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
