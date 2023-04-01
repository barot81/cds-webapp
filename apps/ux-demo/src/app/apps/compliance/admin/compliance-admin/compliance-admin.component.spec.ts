import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceAdminComponent } from './compliance-admin.component';

describe('ComplianceAdminComponent', () => {
  let component: ComplianceAdminComponent;
  let fixture: ComponentFixture<ComplianceAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
