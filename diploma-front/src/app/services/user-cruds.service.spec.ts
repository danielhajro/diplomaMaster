import { TestBed } from '@angular/core/testing';

import { UserCrudsService } from './user-cruds.service';

describe('UserCrudsService', () => {
  let service: UserCrudsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCrudsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
