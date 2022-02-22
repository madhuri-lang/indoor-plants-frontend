import { TestBed } from '@angular/core/testing';

import { BonsaiService } from './bonsai.service';

describe('BonsaiService', () => {
  let service: BonsaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonsaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
