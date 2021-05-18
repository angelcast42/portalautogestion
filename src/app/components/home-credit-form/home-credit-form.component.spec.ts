import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCreditFormComponent } from './home-credit-form.component';

describe('HomeCreditFormComponent', () => {
  let component: HomeCreditFormComponent;
  let fixture: ComponentFixture<HomeCreditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCreditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCreditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
