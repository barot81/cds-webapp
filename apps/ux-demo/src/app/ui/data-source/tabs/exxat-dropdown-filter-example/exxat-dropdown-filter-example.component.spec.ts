import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDropdownFilterExampleComponent } from './exxat-dropdown-filter-example.component';

describe('ExxatDropdownFilterExampleComponent', () => {
  let component: ExxatDropdownFilterExampleComponent;
  let fixture: ComponentFixture<ExxatDropdownFilterExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDropdownFilterExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDropdownFilterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
