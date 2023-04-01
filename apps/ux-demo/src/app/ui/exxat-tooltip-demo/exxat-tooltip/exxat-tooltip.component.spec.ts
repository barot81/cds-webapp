import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTooltipComponent } from './zhealthcare-tooltip.component';

describe('zhealthcareTooltipComponent', () => {
  let component: zhealthcareTooltipComponent;
  let fixture: ComponentFixture<zhealthcareTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
