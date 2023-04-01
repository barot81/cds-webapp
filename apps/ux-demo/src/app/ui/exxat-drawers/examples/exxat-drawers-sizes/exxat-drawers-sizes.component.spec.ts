import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedFacultyComponent } from './associated-faculty.component';

describe('AssociatedFacultyComponent', () => {
  let component: AssociatedFacultyComponent;
  let fixture: ComponentFixture<AssociatedFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatedFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
