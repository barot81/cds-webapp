import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentDetailsDrawerComponent } from './add-department-details-drawer.component';

describe('AddDepartmentDetailsDrawerComponent', () => {
  let component: AddDepartmentDetailsDrawerComponent;
  let fixture: ComponentFixture<AddDepartmentDetailsDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmentDetailsDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentDetailsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
