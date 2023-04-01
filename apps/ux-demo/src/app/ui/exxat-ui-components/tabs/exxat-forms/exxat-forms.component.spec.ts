import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatFormsComponent } from './exxat-forms.component';

describe('ExxatFormsComponent', () => {
  let component: ExxatFormsComponent;
  let fixture: ComponentFixture<ExxatFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
