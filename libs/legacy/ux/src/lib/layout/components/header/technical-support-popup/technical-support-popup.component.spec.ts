import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TechnicalSupportPopupComponent } from './technical-support-popup.component';

describe('TechnicalSupportPopupComponent', () => {
  let component: TechnicalSupportPopupComponent;
  let fixture: ComponentFixture<TechnicalSupportPopupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TechnicalSupportPopupComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalSupportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
