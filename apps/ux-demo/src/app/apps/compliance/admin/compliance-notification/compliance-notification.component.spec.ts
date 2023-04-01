import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceNotificationComponent } from './compliance-notification.component';

describe('ComplianceNotificationComponent', () => {
  let component: ComplianceNotificationComponent;
  let fixture: ComponentFixture<ComplianceNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
