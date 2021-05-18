import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInfoPersonalComponent } from './perfil-info-personal.component';

describe('PerfilInfoPersonalComponent', () => {
  let component: PerfilInfoPersonalComponent;
  let fixture: ComponentFixture<PerfilInfoPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilInfoPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
