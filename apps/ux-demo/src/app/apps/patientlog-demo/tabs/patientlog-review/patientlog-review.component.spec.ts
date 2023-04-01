import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlogReviewComponent } from './patientlog-review.component';

describe('PatientlogReviewComponent', () => {
  let component: PatientlogReviewComponent;
  let fixture: ComponentFixture<PatientlogReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientlogReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientlogReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
