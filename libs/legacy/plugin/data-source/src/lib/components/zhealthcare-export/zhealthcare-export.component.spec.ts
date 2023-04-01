import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareExportComponent } from './zhealthcare-export.component';

describe('zhealthcareExportComponent', () => {
  let component: zhealthcareExportComponent;
  let fixture: ComponentFixture<zhealthcareExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
