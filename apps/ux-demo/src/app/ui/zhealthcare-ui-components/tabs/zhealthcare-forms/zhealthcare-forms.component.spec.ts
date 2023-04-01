import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareFormsComponent } from './zhealthcare-forms.component';

describe('zhealthcareFormsComponent', () => {
  let component: zhealthcareFormsComponent;
  let fixture: ComponentFixture<zhealthcareFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
