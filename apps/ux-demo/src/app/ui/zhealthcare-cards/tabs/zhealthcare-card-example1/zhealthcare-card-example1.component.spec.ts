import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareCardExample1Component } from './zhealthcare-card-example1.component';

describe('zhealthcareCardExample1Component', () => {
  let component: zhealthcareCardExample1Component;
  let fixture: ComponentFixture<zhealthcareCardExample1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareCardExample1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareCardExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
