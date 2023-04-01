import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatEditColumnsExampleComponent } from './exxat-edit-columns-example.component';

describe('ExxatEditColumnsExampleComponent', () => {
  let component: ExxatEditColumnsExampleComponent;
  let fixture: ComponentFixture<ExxatEditColumnsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatEditColumnsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatEditColumnsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
