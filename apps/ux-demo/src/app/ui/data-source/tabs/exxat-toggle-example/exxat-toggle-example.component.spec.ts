import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatToggleExampleComponent } from './exxat-toggle-example.component';

describe('ExxatToggleExampleComponent', () => {
  let component: ExxatToggleExampleComponent;
  let fixture: ComponentFixture<ExxatToggleExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatToggleExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatToggleExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
