import { TestBed } from '@angular/core/testing';

import { InsurancePoliciesService } from './insurance-policies.service';

describe('InsurancePoliciesService', () => {
  let service: InsurancePoliciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancePoliciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
