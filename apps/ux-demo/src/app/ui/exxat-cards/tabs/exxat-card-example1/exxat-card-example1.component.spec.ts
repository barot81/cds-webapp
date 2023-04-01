import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatCardExample1Component } from './exxat-card-example1.component';

describe('ExxatCardExample1Component', () => {
  let component: ExxatCardExample1Component;
  let fixture: ComponentFixture<ExxatCardExample1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatCardExample1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatCardExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
