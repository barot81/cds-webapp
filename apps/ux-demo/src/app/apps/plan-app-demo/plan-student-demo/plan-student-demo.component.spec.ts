import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStudentDemoPlanComponent } from './plan-student-demo.component';

describe('PlanStudentDemoComponent', () => {
  let component: PlanStudentDemoPlanComponent;
  let fixture: ComponentFixture<PlanStudentDemoPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanStudentDemoPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStudentDemoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
