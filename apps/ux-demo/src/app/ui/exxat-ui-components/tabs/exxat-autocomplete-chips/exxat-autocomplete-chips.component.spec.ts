import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatAutocompleteChipsComponent } from './exxat-autocomplete-chips.component';

describe('ExxatAutocompleteChipsComponent', () => {
  let component: ExxatAutocompleteChipsComponent;
  let fixture: ComponentFixture<ExxatAutocompleteChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatAutocompleteChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatAutocompleteChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
