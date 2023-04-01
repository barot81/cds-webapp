import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoDrawerComponent } from './address-info-drawer.component';

describe('AddressInfoDrawerComponent', () => {
  let component: AddressInfoDrawerComponent;
  let fixture: ComponentFixture<AddressInfoDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInfoDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
