import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareMediaQueryComponent } from './zhealthcare-media-query.component';

describe('zhealthcareMediaQueryComponent', () => {
  let component: zhealthcareMediaQueryComponent;
  let fixture: ComponentFixture<zhealthcareMediaQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareMediaQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareMediaQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
