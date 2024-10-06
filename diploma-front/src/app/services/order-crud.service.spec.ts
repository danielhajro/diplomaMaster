import { TestBed } from '@angular/core/testing';

import { OrderCrudService } from './order-crud.service';

describe('OrderCrudService', () => {
  let service: OrderCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
