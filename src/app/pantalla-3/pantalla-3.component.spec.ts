import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla3Component } from './pantalla-3.component';

describe('Pantalla3Component', () => {
  let component: Pantalla3Component;
  let fixture: ComponentFixture<Pantalla3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pantalla3Component]
    });
    fixture = TestBed.createComponent(Pantalla3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
