import { TestBed } from '@angular/core/testing';

import { ItemsListResolverService } from './items-list-resolver.service';

describe('ItemsListResolverService', () => {
  let service: ItemsListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
