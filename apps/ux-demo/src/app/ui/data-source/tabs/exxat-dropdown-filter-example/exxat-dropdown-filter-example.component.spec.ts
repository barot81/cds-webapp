import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDropdownFilterExampleComponent } from './zhealthcare-dropdown-filter-example.component';

describe('zhealthcareDropdownFilterExampleComponent', () => {
  let component: zhealthcareDropdownFilterExampleComponent;
  let fixture: ComponentFixture<zhealthcareDropdownFilterExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDropdownFilterExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDropdownFilterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
