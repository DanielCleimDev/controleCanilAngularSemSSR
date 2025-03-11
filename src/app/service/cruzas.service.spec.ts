import { TestBed } from '@angular/core/testing';

import { CruzasService } from './cruzas.service';

describe('CruzasService', () => {
  let service: CruzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CruzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
