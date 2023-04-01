import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyBasedEvalFormComponent } from './frequency-based-eval-form.component';

describe('FrequencyBasedEvalFormComponent', () => {
  let component: FrequencyBasedEvalFormComponent;
  let fixture: ComponentFixture<FrequencyBasedEvalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencyBasedEvalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyBasedEvalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
