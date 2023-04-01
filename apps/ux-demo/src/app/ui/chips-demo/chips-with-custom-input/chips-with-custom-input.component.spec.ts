import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsWithCustomInputComponent } from './chips-with-custom-input.component';

describe('ChipsWithCustomInputComponent', () => {
  let component: ChipsWithCustomInputComponent;
  let fixture: ComponentFixture<ChipsWithCustomInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsWithCustomInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsWithCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
