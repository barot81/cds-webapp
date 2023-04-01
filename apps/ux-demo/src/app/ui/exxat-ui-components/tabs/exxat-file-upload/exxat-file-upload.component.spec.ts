import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatFileUploadComponent } from './exxat-file-upload.component';

describe('ExxatFileUploadComponent', () => {
  let component: ExxatFileUploadComponent;
  let fixture: ComponentFixture<ExxatFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
