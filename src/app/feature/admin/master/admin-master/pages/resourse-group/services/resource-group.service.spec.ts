import { TestBed } from '@angular/core/testing';

import { ResourceGroupService } from './resource-group.service';

describe('ResourceGroupService', () => {
  let service: ResourceGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
