import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatEditColumnsFormExampleComponent } from './exxat-edit-columns-form-example.component';

describe('ExxatEditColumnsFormExampleComponent', () => {
  let component: ExxatEditColumnsFormExampleComponent;
  let fixture: ComponentFixture<ExxatEditColumnsFormExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatEditColumnsFormExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatEditColumnsFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
