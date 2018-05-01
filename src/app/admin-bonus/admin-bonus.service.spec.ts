import { TestBed, inject } from '@angular/core/testing';

import { AdminBonusService } from './admin-bonus.service';

describe('AdminBonusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminBonusService]
    });
  });

  it('should be created', inject([AdminBonusService], (service: AdminBonusService) => {
    expect(service).toBeTruthy();
  }));
});
