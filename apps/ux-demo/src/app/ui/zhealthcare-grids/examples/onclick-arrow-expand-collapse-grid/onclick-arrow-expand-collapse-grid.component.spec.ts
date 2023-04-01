import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnclickArrowExpandCollapseGridComponent } from './onclick-arrow-expand-collapse-grid.component';

describe('OnclickArrowExpandCollapseGridComponent', () => {
  let component: OnclickArrowExpandCollapseGridComponent;
  let fixture: ComponentFixture<OnclickArrowExpandCollapseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnclickArrowExpandCollapseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnclickArrowExpandCollapseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
