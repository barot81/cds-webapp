import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsWithoutCustomInputComponent } from './chips-without-custom-input.component';

describe('ChipsWithoutCustomInputComponent', () => {
  let component: ChipsWithoutCustomInputComponent;
  let fixture: ComponentFixture<ChipsWithoutCustomInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsWithoutCustomInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsWithoutCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
