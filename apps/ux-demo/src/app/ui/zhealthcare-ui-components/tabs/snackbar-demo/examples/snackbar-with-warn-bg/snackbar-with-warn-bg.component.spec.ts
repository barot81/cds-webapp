import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarWithWarnBgComponent } from './snackbar-with-warn-bg.component';

describe('SnackbarWithWarnBgComponent', () => {
  let component: SnackbarWithWarnBgComponent;
  let fixture: ComponentFixture<SnackbarWithWarnBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarWithWarnBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarWithWarnBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
