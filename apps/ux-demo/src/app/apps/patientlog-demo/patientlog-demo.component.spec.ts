import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlogDemoComponent } from './patientlog-demo.component';

describe('PatientlogDemoComponent', () => {
  let component: PatientlogDemoComponent;
  let fixture: ComponentFixture<PatientlogDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientlogDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientlogDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
