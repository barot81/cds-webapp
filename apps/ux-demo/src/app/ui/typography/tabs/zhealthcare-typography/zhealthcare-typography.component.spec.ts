import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTypographyComponent } from './zhealthcare-typography.component';

describe('zhealthcareTypographyComponent', () => {
  let component: zhealthcareTypographyComponent;
  let fixture: ComponentFixture<zhealthcareTypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTypographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
