import { TestBed } from '@angular/core/testing';

import { MachosService } from './machos.service';

describe('MachosService', () => {
  let service: MachosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
