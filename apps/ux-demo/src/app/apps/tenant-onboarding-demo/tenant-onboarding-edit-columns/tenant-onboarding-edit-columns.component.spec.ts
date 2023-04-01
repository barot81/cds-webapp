import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantOnboardingEditColumnsComponent } from './tenant-onboarding-edit-columns.component';

describe('TenantOnboardingEditColumnsComponent', () => {
  let component: TenantOnboardingEditColumnsComponent;
  let fixture: ComponentFixture<TenantOnboardingEditColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantOnboardingEditColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantOnboardingEditColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
