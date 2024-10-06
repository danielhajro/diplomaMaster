import { TestBed } from '@angular/core/testing';

import { WishlistCrudService } from './wishlist-crud.service';

describe('WishlistCrudService', () => {
  let service: WishlistCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
