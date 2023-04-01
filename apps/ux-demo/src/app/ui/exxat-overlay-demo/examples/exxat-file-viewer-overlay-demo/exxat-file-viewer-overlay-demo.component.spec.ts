import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatFileViewerOverlayDemoComponent } from './exxat-file-viewer-overlay-demo.component';

describe('ExxatFileViewerOverlayDemoComponent', () => {
  let component: ExxatFileViewerOverlayDemoComponent;
  let fixture: ComponentFixture<ExxatFileViewerOverlayDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatFileViewerOverlayDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatFileViewerOverlayDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
