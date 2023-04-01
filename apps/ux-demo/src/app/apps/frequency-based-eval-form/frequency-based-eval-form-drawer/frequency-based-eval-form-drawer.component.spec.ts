import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyBasedEvalFormDrawerComponent } from './frequency-based-eval-form-drawer.component';

describe('FrequencyBasedEvalFormDrawerComponent', () => {
  let component: FrequencyBasedEvalFormDrawerComponent;
  let fixture: ComponentFixture<FrequencyBasedEvalFormDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencyBasedEvalFormDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyBasedEvalFormDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
