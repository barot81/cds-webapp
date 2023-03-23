import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDisplayColumnsFormComponent } from './exxat-display-columns-form.component';

describe('ExxatDisplayColumnsFormComponent', () => {
  let component: ExxatDisplayColumnsFormComponent;
  let fixture: ComponentFixture<ExxatDisplayColumnsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDisplayColumnsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDisplayColumnsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
