import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionDetailsDrawerComponent } from './edit-institution-details-drawer.component';

describe('EditInstitutionDetailsDrawerComponent', () => {
  let component: EditInstitutionDetailsDrawerComponent;
  let fixture: ComponentFixture<EditInstitutionDetailsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInstitutionDetailsDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionDetailsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
