import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarWithAutoSelectionComponent } from './search-bar-with-auto-selection.component';

describe('SearchBarWithAutoSelectionComponent', () => {
  let component: SearchBarWithAutoSelectionComponent;
  let fixture: ComponentFixture<SearchBarWithAutoSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarWithAutoSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarWithAutoSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
