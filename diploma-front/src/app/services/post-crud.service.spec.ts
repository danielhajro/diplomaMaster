import { TestBed } from '@angular/core/testing';

import { PostCrudService } from './post-crud.service';

describe('PostCrudService', () => {
  let service: PostCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
