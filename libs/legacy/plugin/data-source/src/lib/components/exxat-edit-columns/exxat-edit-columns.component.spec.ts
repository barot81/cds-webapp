import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatEditColumnsComponent } from './exxat-edit-columns.component';

describe('ExxatEditColumnsComponent', () => {
  let component: ExxatEditColumnsComponent;
  let fixture: ComponentFixture<ExxatEditColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatEditColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatEditColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
