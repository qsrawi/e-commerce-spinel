import { TestBed } from '@angular/core/testing';

import { CartCampaignsandOffersService } from './cart-campaignsand-offers.service';

describe('CartCampaignsandOffersService', () => {
  let service: CartCampaignsandOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCampaignsandOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
