import { TestBed } from '@angular/core/testing';

import { TreediagramService } from './treediagram.service';

describe('TreediagramService', () => {
  let service: TreediagramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreediagramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
