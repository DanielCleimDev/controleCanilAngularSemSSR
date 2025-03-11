import { TestBed } from '@angular/core/testing';

import { CadelasService } from './cadelas.service';

describe('CadelasService', () => {
  let service: CadelasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadelasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
