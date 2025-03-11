import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadNinhadaComponent } from './cad-ninhada.component';

describe('CadNinhadaComponent', () => {
  let component: CadNinhadaComponent;
  let fixture: ComponentFixture<CadNinhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadNinhadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadNinhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
