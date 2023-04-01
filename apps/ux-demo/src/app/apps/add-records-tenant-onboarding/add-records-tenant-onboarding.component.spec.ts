import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordsTenantOnboardingComponent } from './add-records-tenant-onboarding.component';

describe('AddRecordsTenantOnboardingComponent', () => {
  let component: AddRecordsTenantOnboardingComponent;
  let fixture: ComponentFixture<AddRecordsTenantOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecordsTenantOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordsTenantOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
