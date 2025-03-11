import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCadelaComponent } from './cad-cadela.component';

describe('CadCadelaComponent', () => {
  let component: CadCadelaComponent;
  let fixture: ComponentFixture<CadCadelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadCadelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadCadelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
