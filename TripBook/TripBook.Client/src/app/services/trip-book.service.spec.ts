import { TestBed, inject } from '@angular/core/testing';

import { TripBookService } from './trip-book.service';

describe('TripBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripBookService]
    });
  });

  it('should be created', inject([TripBookService], (service: TripBookService) => {
    expect(service).toBeTruthy();
  }));
});
