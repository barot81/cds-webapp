import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceReviewComponent } from './compliance-review.component';

describe('ComplianceReviewComponent', () => {
  let component: ComplianceReviewComponent;
  let fixture: ComponentFixture<ComplianceReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
