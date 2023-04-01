import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDrawerFormExamplesComponent } from './zhealthcare-drawer-form-examples.component';

describe('zhealthcareDrawerFormExamplesComponent', () => {
  let component: zhealthcareDrawerFormExamplesComponent;
  let fixture: ComponentFixture<zhealthcareDrawerFormExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDrawerFormExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDrawerFormExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
