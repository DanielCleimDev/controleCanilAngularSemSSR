import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruzasComponent } from './cruzas.component';

describe('CruzasComponent', () => {
  let component: CruzasComponent;
  let fixture: ComponentFixture<CruzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruzasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
