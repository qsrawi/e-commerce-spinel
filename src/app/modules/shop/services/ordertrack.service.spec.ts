import { TestBed } from '@angular/core/testing';

import { OrdertrackService } from './ordertrack.service';

describe('OrdertrackService', () => {
  let service: OrdertrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdertrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
