import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpCenterPopupComponent } from './help-center-popup.component';

describe('HelpCenterPopupComponent', () => {
  let component: HelpCenterPopupComponent;
  let fixture: ComponentFixture<HelpCenterPopupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HelpCenterPopupComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
