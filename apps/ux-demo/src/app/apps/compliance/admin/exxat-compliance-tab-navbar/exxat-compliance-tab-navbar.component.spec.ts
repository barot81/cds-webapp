import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatComplianceTabNavbarComponent } from './exxat-compliance-tab-navbar.component';

describe('ExxatComplianceTabNavbarComponent', () => {
  let component: ExxatComplianceTabNavbarComponent;
  let fixture: ComponentFixture<ExxatComplianceTabNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatComplianceTabNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatComplianceTabNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
