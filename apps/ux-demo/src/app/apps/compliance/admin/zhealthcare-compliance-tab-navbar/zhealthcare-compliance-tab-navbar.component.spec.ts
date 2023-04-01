import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareComplianceTabNavbarComponent } from './zhealthcare-compliance-tab-navbar.component';

describe('zhealthcareComplianceTabNavbarComponent', () => {
  let component: zhealthcareComplianceTabNavbarComponent;
  let fixture: ComponentFixture<zhealthcareComplianceTabNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareComplianceTabNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareComplianceTabNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
