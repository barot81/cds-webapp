import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceDocumentDemoComponent } from './compliance-document-demo.component';

describe('ComplianceDocumentDemoComponent', () => {
  let component: ComplianceDocumentDemoComponent;
  let fixture: ComponentFixture<ComplianceDocumentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceDocumentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceDocumentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
