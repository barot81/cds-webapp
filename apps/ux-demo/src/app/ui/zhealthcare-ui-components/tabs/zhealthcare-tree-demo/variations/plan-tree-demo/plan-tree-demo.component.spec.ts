import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTreeDemoComponent } from './plan-tree-demo.component';

describe('PlanTreeDemoComponent', () => {
  let component: PlanTreeDemoComponent;
  let fixture: ComponentFixture<PlanTreeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTreeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTreeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
