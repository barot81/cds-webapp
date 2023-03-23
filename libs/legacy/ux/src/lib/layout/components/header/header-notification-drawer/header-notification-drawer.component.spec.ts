import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderNotificationDrawerComponent } from './header-notification-drawer.component';

describe('HeaderNotificationDrawerComponent', () => {
  let component: HeaderNotificationDrawerComponent;
  let fixture: ComponentFixture<HeaderNotificationDrawerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderNotificationDrawerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNotificationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
