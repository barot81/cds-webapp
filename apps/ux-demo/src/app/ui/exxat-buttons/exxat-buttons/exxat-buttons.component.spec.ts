import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareButtonsComponent } from './zhealthcare-buttons.component';

describe('zhealthcareButtonsComponent', () => {
  let component: zhealthcareButtonsComponent;
  let fixture: ComponentFixture<zhealthcareButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
