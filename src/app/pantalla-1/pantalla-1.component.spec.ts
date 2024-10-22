import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla1Component } from './pantalla-1.component';

describe('Pantalla1Component', () => {
  let component: Pantalla1Component;
  let fixture: ComponentFixture<Pantalla1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pantalla1Component]
    });
    fixture = TestBed.createComponent(Pantalla1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
