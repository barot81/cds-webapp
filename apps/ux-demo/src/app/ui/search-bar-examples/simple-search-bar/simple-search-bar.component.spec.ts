import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSearchBarComponent } from './simple-search-bar.component';

describe('SimpleSearchBarComponent', () => {
  let component: SimpleSearchBarComponent;
  let fixture: ComponentFixture<SimpleSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
