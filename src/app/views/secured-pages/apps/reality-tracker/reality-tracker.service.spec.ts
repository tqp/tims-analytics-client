import { TestBed } from '@angular/core/testing';

import { RealityTrackerService } from './reality-tracker.service';

describe('RealityTrackerService', () => {
  let service: RealityTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealityTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
