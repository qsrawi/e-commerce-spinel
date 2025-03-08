import { TestBed } from '@angular/core/testing';

import { TypeResolverService } from './type-resolver.service';

describe('TypeResolverService', () => {
  let service: TypeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
