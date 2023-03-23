import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatExportComponent } from './exxat-export.component';

describe('ExxatExportComponent', () => {
  let component: ExxatExportComponent;
  let fixture: ComponentFixture<ExxatExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
