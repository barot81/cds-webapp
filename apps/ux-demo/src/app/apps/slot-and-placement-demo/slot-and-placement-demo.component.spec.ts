import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotAndPlacementDemoComponent } from './slot-and-placement-demo.component';

describe('SlotAndPlacementDemoComponent', () => {
  let component: SlotAndPlacementDemoComponent;
  let fixture: ComponentFixture<SlotAndPlacementDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotAndPlacementDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotAndPlacementDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
