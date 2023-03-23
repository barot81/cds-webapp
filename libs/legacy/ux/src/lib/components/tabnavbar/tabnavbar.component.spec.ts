import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabNavbarComponent } from './tabnavbar.component';

describe('NavbarComponent', () => {
  let component: TabNavbarComponent;
  let fixture: ComponentFixture<TabNavbarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabNavbarComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
