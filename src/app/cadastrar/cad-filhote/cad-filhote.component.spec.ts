import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadFilhoteComponent } from './cad-filhote.component';

describe('CadFilhoteComponent', () => {
  let component: CadFilhoteComponent;
  let fixture: ComponentFixture<CadFilhoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadFilhoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadFilhoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
