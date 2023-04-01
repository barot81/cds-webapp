import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceManagementSummaryComponent } from './compliance-management-summary.component';

describe('ComplianceManagementSummaryComponent', () => {
  let component: ComplianceManagementSummaryComponent;
  let fixture: ComponentFixture<ComplianceManagementSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceManagementSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceManagementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
