import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventScheduleDrawerComponent } from './add-event-schedule-drawer.component';

describe('AddEventScheduleDrawerComponent', () => {
  let component: AddEventScheduleDrawerComponent;
  let fixture: ComponentFixture<AddEventScheduleDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventScheduleDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventScheduleDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
