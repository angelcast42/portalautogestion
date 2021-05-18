import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrorFormComponent } from './modal-error-form.component';

describe('ModalErrorFormComponent', () => {
  let component: ModalErrorFormComponent;
  let fixture: ComponentFixture<ModalErrorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalErrorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
