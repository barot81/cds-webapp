import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementTabNavBarComponent } from './placement-tab-nav-bar.component';

describe('PlacementTabNavBarComponent', () => {
  let component: PlacementTabNavBarComponent;
  let fixture: ComponentFixture<PlacementTabNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementTabNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementTabNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
