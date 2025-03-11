import { TestBed } from '@angular/core/testing';

import { NinhadasService } from './ninhadas.service';

describe('NinhadasService', () => {
  let service: NinhadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinhadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
