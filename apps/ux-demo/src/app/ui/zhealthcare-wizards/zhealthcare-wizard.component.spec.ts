import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareWizardComponent } from './zhealthcare-wizard.component';

describe('zhealthcareWizardComponent', () => {
  let component: zhealthcareWizardComponent;
  let fixture: ComponentFixture<zhealthcareWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
