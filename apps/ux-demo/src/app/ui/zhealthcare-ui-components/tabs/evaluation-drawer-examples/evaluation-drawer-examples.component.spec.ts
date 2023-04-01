import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDrawerExamplesComponent } from './evaluation-drawer-examples.component';

describe('EvaluationDrawerExamplesComponent', () => {
  let component: EvaluationDrawerExamplesComponent;
  let fixture: ComponentFixture<EvaluationDrawerExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationDrawerExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationDrawerExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
