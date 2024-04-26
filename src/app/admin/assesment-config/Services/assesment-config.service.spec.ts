import { TestBed } from '@angular/core/testing';

import { AssesmentConfigService } from './assesment-config.service';

describe('AssesmentConfigService', () => {
  let service: AssesmentConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssesmentConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
