import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDrawerFormExamplesComponent } from './exxat-drawer-form-examples.component';

describe('ExxatDrawerFormExamplesComponent', () => {
  let component: ExxatDrawerFormExamplesComponent;
  let fixture: ComponentFixture<ExxatDrawerFormExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDrawerFormExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDrawerFormExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
