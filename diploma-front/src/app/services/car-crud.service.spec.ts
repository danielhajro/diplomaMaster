import { TestBed } from '@angular/core/testing';

import { CarCrudService } from './car-crud.service';

describe('CarCrudService', () => {
  let service: CarCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
