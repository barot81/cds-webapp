import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationInfoDrawerComponent } from './certification-info-drawer.component';

describe('CertificationInfoDrawerComponent', () => {
  let component: CertificationInfoDrawerComponent;
  let fixture: ComponentFixture<CertificationInfoDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationInfoDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationInfoDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
