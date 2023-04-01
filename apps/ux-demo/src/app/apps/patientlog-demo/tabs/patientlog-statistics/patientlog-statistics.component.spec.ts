import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlogStatisticsComponent } from './patientlog-statistics.component';

describe('PatientlogStatisticsComponent', () => {
  let component: PatientlogStatisticsComponent;
  let fixture: ComponentFixture<PatientlogStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientlogStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientlogStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
