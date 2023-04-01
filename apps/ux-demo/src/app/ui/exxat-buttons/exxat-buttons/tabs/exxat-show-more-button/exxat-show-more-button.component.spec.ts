import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatShowMoreButtonComponent } from './exxat-show-more-button.component';

describe('ExxatShowMoreButtonComponent', () => {
  let component: ExxatShowMoreButtonComponent;
  let fixture: ComponentFixture<ExxatShowMoreButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatShowMoreButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatShowMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
