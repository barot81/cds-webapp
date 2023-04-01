import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageTab1Component } from './inner-page-tab1.component';

describe('InnerPageTab1Component', () => {
  let component: InnerPageTab1Component;
  let fixture: ComponentFixture<InnerPageTab1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPageTab1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPageTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
