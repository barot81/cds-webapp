import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantOnboardingDemoComponent } from './tenant-onboarding-demo.component';

describe('TenantOnboardingDemoComponent', () => {
  let component: TenantOnboardingDemoComponent;
  let fixture: ComponentFixture<TenantOnboardingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantOnboardingDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantOnboardingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
