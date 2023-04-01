import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCourseDetailsDemoComponent } from './plan-course-details-demo.component';

describe('PlanCourseDetailsDemoComponent', () => {
  let component: PlanCourseDetailsDemoComponent;
  let fixture: ComponentFixture<PlanCourseDetailsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCourseDetailsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCourseDetailsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
