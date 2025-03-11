import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinhadasComponent } from './ninhadas.component';

describe('NinhadasComponent', () => {
  let component: NinhadasComponent;
  let fixture: ComponentFixture<NinhadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinhadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinhadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
