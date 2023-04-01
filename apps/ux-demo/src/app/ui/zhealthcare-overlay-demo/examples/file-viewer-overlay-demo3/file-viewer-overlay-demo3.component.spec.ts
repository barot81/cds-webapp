import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewerOverlayDemo3Component } from './file-viewer-overlay-demo3.component';

describe('FileViewerOverlayDemo3Component', () => {
  let component: FileViewerOverlayDemo3Component;
  let fixture: ComponentFixture<FileViewerOverlayDemo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileViewerOverlayDemo3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewerOverlayDemo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
