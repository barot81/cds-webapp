import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManifoldPanelComponent } from './manifold-panel.component';

describe('ManifoldPanelComponent', () => {
  let component: ManifoldPanelComponent;
  let fixture: ComponentFixture<ManifoldPanelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManifoldPanelComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifoldPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
