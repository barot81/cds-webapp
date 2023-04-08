import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreFilterDrawerComponent } from './show-more-filter-drawer.component';

describe('ShowMoreFilterDrawerComponent', () => {
  let component: ShowMoreFilterDrawerComponent;
  let fixture: ComponentFixture<ShowMoreFilterDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMoreFilterDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreFilterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
