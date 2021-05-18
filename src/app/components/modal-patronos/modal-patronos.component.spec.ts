import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPatronosComponent } from './modal-patronos.component';

describe('ModalPatronosComponent', () => {
  let component: ModalPatronosComponent;
  let fixture: ComponentFixture<ModalPatronosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPatronosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPatronosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
