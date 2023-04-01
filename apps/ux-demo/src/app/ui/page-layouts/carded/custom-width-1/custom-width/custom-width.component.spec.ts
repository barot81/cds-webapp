import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWidthComponent } from './custom-width.component';

describe('CustomWidthComponent', () => {
  let component: CustomWidthComponent;
  let fixture: ComponentFixture<CustomWidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
