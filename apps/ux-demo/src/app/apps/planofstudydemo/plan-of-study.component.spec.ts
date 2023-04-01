import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOfStudyComponent } from './plan-of-study.component';

describe('PlanOfStudyComponent', () => {
  let component: PlanOfStudyComponent;
  let fixture: ComponentFixture<PlanOfStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOfStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
