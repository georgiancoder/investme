import { TestBed, inject } from '@angular/core/testing';

import { LangsService } from './langs.service';

describe('LangsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangsService]
    });
  });

  it('should be created', inject([LangsService], (service: LangsService) => {
    expect(service).toBeTruthy();
  }));
});
