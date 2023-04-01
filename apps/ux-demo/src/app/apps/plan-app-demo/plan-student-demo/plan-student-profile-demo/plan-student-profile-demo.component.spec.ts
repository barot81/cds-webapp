import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStudentProfileDemoComponent } from './plan-student-profile-demo.component';

describe('PlanStudentProfileDemoComponent', () => {
  let component: PlanStudentProfileDemoComponent;
  let fixture: ComponentFixture<PlanStudentProfileDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanStudentProfileDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStudentProfileDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
