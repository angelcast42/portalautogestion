import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilNavBarComponent } from './perfil-nav-bar.component';

describe('PerfilNavBarComponent', () => {
  let component: PerfilNavBarComponent;
  let fixture: ComponentFixture<PerfilNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
