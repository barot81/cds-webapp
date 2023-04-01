import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateClinicalInstructorDrawerComponent } from './associate-clinical-instructor-drawer.component';

describe('AssociateClinicalInstructorDrawerComponent', () => {
  let component: AssociateClinicalInstructorDrawerComponent;
  let fixture: ComponentFixture<AssociateClinicalInstructorDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateClinicalInstructorDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateClinicalInstructorDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
