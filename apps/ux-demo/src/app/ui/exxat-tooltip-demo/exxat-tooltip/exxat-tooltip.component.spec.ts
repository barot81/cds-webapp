import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTooltipComponent } from './exxat-tooltip.component';

describe('ExxatTooltipComponent', () => {
  let component: ExxatTooltipComponent;
  let fixture: ComponentFixture<ExxatTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
