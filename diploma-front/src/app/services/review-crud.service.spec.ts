import { TestBed } from '@angular/core/testing';

import { ReviewCrudService } from './review-crud.service';

describe('ReviewCrudService', () => {
  let service: ReviewCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
