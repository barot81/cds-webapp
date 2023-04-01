import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStudentBasicInfoDrawerComponent } from './plan-student-basic-info-drawer.component';

describe('PlanStudentBasicInfoDrawerComponent', () => {
  let component: PlanStudentBasicInfoDrawerComponent;
  let fixture: ComponentFixture<PlanStudentBasicInfoDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanStudentBasicInfoDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStudentBasicInfoDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
