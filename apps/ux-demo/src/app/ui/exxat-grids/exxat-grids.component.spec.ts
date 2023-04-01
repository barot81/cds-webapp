import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatGridsComponent } from './exxat-grids.component';

describe('ExxatGridsComponent', () => {
  let component: ExxatGridsComponent;
  let fixture: ComponentFixture<ExxatGridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatGridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
