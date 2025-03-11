import { TestBed } from '@angular/core/testing';

import { FilhoteService } from './filhote.service';

describe('FilhoteService', () => {
  let service: FilhoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilhoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
