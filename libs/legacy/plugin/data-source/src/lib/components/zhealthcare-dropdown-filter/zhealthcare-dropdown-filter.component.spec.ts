import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDropdownFilterComponent } from './zhealthcare-dropdown-filter.component';

describe('zhealthcareDropdownFilterComponent', () => {
  let component: zhealthcareDropdownFilterComponent;
  let fixture: ComponentFixture<zhealthcareDropdownFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDropdownFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDropdownFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
