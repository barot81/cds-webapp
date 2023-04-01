import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssWizardComponent } from './ess-wizard.component';

describe('EssWizardComponent', () => {
  let component: EssWizardComponent;
  let fixture: ComponentFixture<EssWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
