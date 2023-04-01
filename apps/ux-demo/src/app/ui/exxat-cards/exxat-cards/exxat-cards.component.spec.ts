import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareCardsComponent } from './zhealthcare-cards.component';

describe('zhealthcareCardsComponent', () => {
  let component: zhealthcareCardsComponent;
  let fixture: ComponentFixture<zhealthcareCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
