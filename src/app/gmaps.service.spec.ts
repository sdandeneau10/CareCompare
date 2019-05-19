import { TestBed } from '@angular/core/testing';

import { GmapsService } from './gmaps.service';

describe('GmapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmapsService = TestBed.get(GmapsService);
    expect(service).toBeTruthy();
  });
});
