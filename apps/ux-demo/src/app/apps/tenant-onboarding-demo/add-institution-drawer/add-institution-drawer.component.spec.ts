import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionDrawerComponent } from './add-institution-drawer.component';

describe('AddInstitutionDrawerComponent', () => {
  let component: AddInstitutionDrawerComponent;
  let fixture: ComponentFixture<AddInstitutionDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstitutionDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutionDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
