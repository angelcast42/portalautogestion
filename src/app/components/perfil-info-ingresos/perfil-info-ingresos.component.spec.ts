import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInfoIngresosComponent } from './perfil-info-ingresos.component';

describe('PerfilInfoIngresosComponent', () => {
  let component: PerfilInfoIngresosComponent;
  let fixture: ComponentFixture<PerfilInfoIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilInfoIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilInfoIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
