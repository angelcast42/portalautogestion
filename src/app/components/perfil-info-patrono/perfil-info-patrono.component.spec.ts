import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInfoPatronoComponent } from './perfil-info-patrono.component';

describe('PerfilInfoPatronoComponent', () => {
  let component: PerfilInfoPatronoComponent;
  let fixture: ComponentFixture<PerfilInfoPatronoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilInfoPatronoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilInfoPatronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
