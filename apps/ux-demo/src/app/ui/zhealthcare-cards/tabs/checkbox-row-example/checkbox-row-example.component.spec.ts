import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxRowExampleComponent } from './checkbox-row-example.component';

describe('CheckboxRowExampleComponent', () => {
  let component: CheckboxRowExampleComponent;
  let fixture: ComponentFixture<CheckboxRowExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxRowExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxRowExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
