import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDescubreComponent } from './home-descubre.component';

describe('HomeDescubreComponent', () => {
  let component: HomeDescubreComponent;
  let fixture: ComponentFixture<HomeDescubreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDescubreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDescubreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
