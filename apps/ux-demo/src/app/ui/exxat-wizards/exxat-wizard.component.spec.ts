import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatWizardComponent } from './exxat-wizard.component';

describe('ExxatWizardComponent', () => {
  let component: ExxatWizardComponent;
  let fixture: ComponentFixture<ExxatWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
