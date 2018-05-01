import { TestBed, inject } from '@angular/core/testing';

import { DiscountsService } from './discounts.service';

describe('DiscountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscountsService]
    });
  });

  it('should be created', inject([DiscountsService], (service: DiscountsService) => {
    expect(service).toBeTruthy();
  }));
});
