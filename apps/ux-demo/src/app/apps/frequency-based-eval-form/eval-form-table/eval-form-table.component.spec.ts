import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalFormTableComponent } from './eval-form-table.component';

describe('EvalFormTableComponent', () => {
  let component: EvalFormTableComponent;
  let fixture: ComponentFixture<EvalFormTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalFormTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
