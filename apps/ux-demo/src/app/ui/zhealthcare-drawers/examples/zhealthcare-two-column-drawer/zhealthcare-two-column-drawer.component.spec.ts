import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTwoColumnDrawerComponent } from './zhealthcare-two-column-drawer.component';

describe('zhealthcareTwoColumnDrawerComponent', () => {
  let component: zhealthcareTwoColumnDrawerComponent;
  let fixture: ComponentFixture<zhealthcareTwoColumnDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTwoColumnDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTwoColumnDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
