import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDrawersComponent } from './exxat-drawers.component';

describe('ExxatDrawersComponent', () => {
  let component: ExxatDrawersComponent;
  let fixture: ComponentFixture<ExxatDrawersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDrawersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDrawersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
