import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCruzaComponent } from './cad-cruza.component';

describe('CadCruzaComponent', () => {
  let component: CadCruzaComponent;
  let fixture: ComponentFixture<CadCruzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadCruzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadCruzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
