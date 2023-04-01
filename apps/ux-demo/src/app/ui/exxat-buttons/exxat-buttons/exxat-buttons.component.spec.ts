import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatButtonsComponent } from './exxat-buttons.component';

describe('ExxatButtonsComponent', () => {
  let component: ExxatButtonsComponent;
  let fixture: ComponentFixture<ExxatButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
