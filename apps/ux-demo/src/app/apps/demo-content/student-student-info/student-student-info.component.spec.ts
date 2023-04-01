import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStudentInfoComponent } from './student-student-info.component';

describe('StudentStudentInfoComponent', () => {
  let component: StudentStudentInfoComponent;
  let fixture: ComponentFixture<StudentStudentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStudentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
