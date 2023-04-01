import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExampleDemoComponent } from './popup-example-demo.component';

describe('PopupExampleDemoComponent', () => {
  let component: PopupExampleDemoComponent;
  let fixture: ComponentFixture<PopupExampleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupExampleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupExampleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
