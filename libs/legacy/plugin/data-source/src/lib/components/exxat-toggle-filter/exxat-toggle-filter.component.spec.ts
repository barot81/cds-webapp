import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareToggleFilterComponent } from './zhealthcare-toggle-filter.component';

describe('zhealthcareToggleFilterComponent', () => {
  let component: zhealthcareToggleFilterComponent;
  let fixture: ComponentFixture<zhealthcareToggleFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareToggleFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareToggleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
