import { TestBed } from '@angular/core/testing';

import { ResourceMasterService } from './resource-master.service';

describe('ResourceMasterService', () => {
  let service: ResourceMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
