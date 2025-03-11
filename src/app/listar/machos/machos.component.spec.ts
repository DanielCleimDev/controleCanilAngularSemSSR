import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachosComponent } from './machos.component';

describe('MachosComponent', () => {
  let component: MachosComponent;
  let fixture: ComponentFixture<MachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
