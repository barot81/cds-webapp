import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatWeekdayPickerComponent } from './exxat-weekday-picker.component';

describe('ExxatWeekdayPickerComponent', () => {
  let component: ExxatWeekdayPickerComponent;
  let fixture: ComponentFixture<ExxatWeekdayPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatWeekdayPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatWeekdayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
