import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatInlineTextElementsComponent } from './exxat-inline-text-elements.component';

describe('ExxatInlineTextElementsComponent', () => {
  let component: ExxatInlineTextElementsComponent;
  let fixture: ComponentFixture<ExxatInlineTextElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatInlineTextElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatInlineTextElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
