import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatToggleFilterComponent } from './exxat-toggle-filter.component';

describe('ExxatToggleFilterComponent', () => {
  let component: ExxatToggleFilterComponent;
  let fixture: ComponentFixture<ExxatToggleFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatToggleFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatToggleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
