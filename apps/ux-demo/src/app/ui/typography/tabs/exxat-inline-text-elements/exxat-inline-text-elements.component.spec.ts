import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareInlineTextElementsComponent } from './zhealthcare-inline-text-elements.component';

describe('zhealthcareInlineTextElementsComponent', () => {
  let component: zhealthcareInlineTextElementsComponent;
  let fixture: ComponentFixture<zhealthcareInlineTextElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareInlineTextElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareInlineTextElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
