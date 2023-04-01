import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatUiComponentsComponent } from './exxat-ui-components.component';

describe('ExxatUiComponentsComponent', () => {
  let component: ExxatUiComponentsComponent;
  let fixture: ComponentFixture<ExxatUiComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatUiComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatUiComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
