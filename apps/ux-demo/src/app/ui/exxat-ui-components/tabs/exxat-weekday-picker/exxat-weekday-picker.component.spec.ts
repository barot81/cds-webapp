import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareWeekdayPickerComponent } from './zhealthcare-weekday-picker.component';

describe('zhealthcareWeekdayPickerComponent', () => {
  let component: zhealthcareWeekdayPickerComponent;
  let fixture: ComponentFixture<zhealthcareWeekdayPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareWeekdayPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareWeekdayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
