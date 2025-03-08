import { TestBed } from '@angular/core/testing';

import { WishlistItemService } from './wishlist-item.service';

describe('WishlistItemService', () => {
  let service: WishlistItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
