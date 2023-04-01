import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareFileUploadComponent } from './zhealthcare-file-upload.component';

describe('zhealthcareFileUploadComponent', () => {
  let component: zhealthcareFileUploadComponent;
  let fixture: ComponentFixture<zhealthcareFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
