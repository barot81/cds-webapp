import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDemo500Component } from './error-demo500.component';

describe('ErrorDemo500Component', () => {
  let component: ErrorDemo500Component;
  let fixture: ComponentFixture<ErrorDemo500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDemo500Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDemo500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
