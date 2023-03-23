import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDropdownFilterComponent } from './exxat-dropdown-filter.component';

describe('ExxatDropdownFilterComponent', () => {
  let component: ExxatDropdownFilterComponent;
  let fixture: ComponentFixture<ExxatDropdownFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDropdownFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDropdownFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
