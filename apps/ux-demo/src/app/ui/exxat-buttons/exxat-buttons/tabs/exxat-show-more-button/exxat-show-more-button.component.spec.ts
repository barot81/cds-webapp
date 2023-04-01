import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareShowMoreButtonComponent } from './zhealthcare-show-more-button.component';

describe('zhealthcareShowMoreButtonComponent', () => {
  let component: zhealthcareShowMoreButtonComponent;
  let fixture: ComponentFixture<zhealthcareShowMoreButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareShowMoreButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareShowMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
