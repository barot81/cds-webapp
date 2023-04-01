import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEmployementDetailsDrawerComponent } from './general-employement-details-drawer.component';

describe('GeneralEmployementDetailsDrawerComponent', () => {
  let component: GeneralEmployementDetailsDrawerComponent;
  let fixture: ComponentFixture<GeneralEmployementDetailsDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEmployementDetailsDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEmployementDetailsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
