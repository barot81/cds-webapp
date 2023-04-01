import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionPageDemoComponent } from './terms-and-condition-page-demo.component';

describe('TermsAndConditionPageDemoComponent', () => {
  let component: TermsAndConditionPageDemoComponent;
  let fixture: ComponentFixture<TermsAndConditionPageDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndConditionPageDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionPageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
