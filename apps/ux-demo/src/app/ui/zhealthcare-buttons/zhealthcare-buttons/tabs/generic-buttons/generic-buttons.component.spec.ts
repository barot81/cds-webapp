import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericButtonsComponent } from './generic-buttons.component';

describe('GenericButtonsComponent', () => {
  let component: GenericButtonsComponent;
  let fixture: ComponentFixture<GenericButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
