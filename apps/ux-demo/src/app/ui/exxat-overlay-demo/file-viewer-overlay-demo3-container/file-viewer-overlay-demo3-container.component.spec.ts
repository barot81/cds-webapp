import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewerOverlayDemo3ContainerComponent } from './file-viewer-overlay-demo3-container.component';

describe('FileViewerOverlayDemo3ContainerComponent', () => {
  let component: FileViewerOverlayDemo3ContainerComponent;
  let fixture: ComponentFixture<FileViewerOverlayDemo3ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileViewerOverlayDemo3ContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewerOverlayDemo3ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
