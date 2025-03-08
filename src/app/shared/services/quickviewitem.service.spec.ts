import { TestBed } from '@angular/core/testing';

import { QuickviewitemService } from './quickviewitem.service';

describe('QuickviewitemService', () => {
  let service: QuickviewitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickviewitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
