import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadelasComponent } from './cadelas.component';

describe('CadelasComponent', () => {
  let component: CadelasComponent;
  let fixture: ComponentFixture<CadelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadelasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
