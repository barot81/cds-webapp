import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareAutocompleteChipsComponent } from './zhealthcare-autocomplete-chips.component';

describe('zhealthcareAutocompleteChipsComponent', () => {
  let component: zhealthcareAutocompleteChipsComponent;
  let fixture: ComponentFixture<zhealthcareAutocompleteChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareAutocompleteChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareAutocompleteChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
