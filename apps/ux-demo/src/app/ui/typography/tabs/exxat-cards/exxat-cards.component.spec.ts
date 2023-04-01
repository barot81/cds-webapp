import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatCardsComponent } from './exxat-cards.component';

describe('ExxatCardsComponent', () => {
  let component: ExxatCardsComponent;
  let fixture: ComponentFixture<ExxatCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
