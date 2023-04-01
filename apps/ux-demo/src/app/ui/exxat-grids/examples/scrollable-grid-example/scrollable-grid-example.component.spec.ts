import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableGridExampleComponent } from './scrollable-grid-example.component';

describe('ScrollableGridExampleComponent', () => {
  let component: ScrollableGridExampleComponent;
  let fixture: ComponentFixture<ScrollableGridExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollableGridExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
