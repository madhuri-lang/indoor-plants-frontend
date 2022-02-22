import { TestBed } from '@angular/core/testing';

import { CeramicService } from './ceramic.service';

describe('CeramicService', () => {
  let service: CeramicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeramicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
