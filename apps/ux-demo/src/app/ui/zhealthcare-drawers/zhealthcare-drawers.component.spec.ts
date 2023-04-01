import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDrawersComponent } from './zhealthcare-drawers.component';

describe('zhealthcareDrawersComponent', () => {
  let component: zhealthcareDrawersComponent;
  let fixture: ComponentFixture<zhealthcareDrawersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDrawersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDrawersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
