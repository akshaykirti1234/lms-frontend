import { TestBed } from '@angular/core/testing';

import { TechnologyServiceService } from './technology-service.service';

describe('TechnologyServiceService', () => {
  let service: TechnologyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
