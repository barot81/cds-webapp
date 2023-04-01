import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarExamplesComponent } from './search-bar-examples.component';

describe('SearchBarExamplesComponent', () => {
  let component: SearchBarExamplesComponent;
  let fixture: ComponentFixture<SearchBarExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
