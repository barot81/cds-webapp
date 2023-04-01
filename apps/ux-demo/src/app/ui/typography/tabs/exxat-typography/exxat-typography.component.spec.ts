import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTypographyComponent } from './exxat-typography.component';

describe('ExxatTypographyComponent', () => {
  let component: ExxatTypographyComponent;
  let fixture: ComponentFixture<ExxatTypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTypographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
