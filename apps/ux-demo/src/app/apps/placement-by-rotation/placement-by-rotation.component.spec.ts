import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementByRotationComponent } from './placement-by-rotation.component';

describe('PlacementByRotationComponent', () => {
  let component: PlacementByRotationComponent;
  let fixture: ComponentFixture<PlacementByRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementByRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementByRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
