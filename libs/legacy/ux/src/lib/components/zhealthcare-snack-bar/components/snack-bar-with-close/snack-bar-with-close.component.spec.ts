import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnackBarWithCloseComponent } from './snack-bar-with-close.component';

describe('SnackBarWithCloseComponent', () => {
  let component: SnackBarWithCloseComponent;
  let fixture: ComponentFixture<SnackBarWithCloseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SnackBarWithCloseComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarWithCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
