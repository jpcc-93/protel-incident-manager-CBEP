import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Factibilidad } from './factibilidad';

describe('Factibilidad', () => {
  let component: Factibilidad;
  let fixture: ComponentFixture<Factibilidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Factibilidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Factibilidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
