import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarWithDropdownComponent } from './search-bar-with-dropdown.component';

describe('SearchBarWithDropdownComponent', () => {
  let component: SearchBarWithDropdownComponent;
  let fixture: ComponentFixture<SearchBarWithDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarWithDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarWithDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
