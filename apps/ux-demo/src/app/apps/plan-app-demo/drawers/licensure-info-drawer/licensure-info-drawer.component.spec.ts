import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensureInfoDrawerComponent } from './licensure-info-drawer.component';

describe('LicensureInfoDrawerComponent', () => {
  let component: LicensureInfoDrawerComponent;
  let fixture: ComponentFixture<LicensureInfoDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensureInfoDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensureInfoDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
