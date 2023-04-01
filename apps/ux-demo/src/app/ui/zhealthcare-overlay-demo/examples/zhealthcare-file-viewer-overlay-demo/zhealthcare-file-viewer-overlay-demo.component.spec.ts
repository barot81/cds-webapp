import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareFileViewerOverlayDemoComponent } from './zhealthcare-file-viewer-overlay-demo.component';

describe('zhealthcareFileViewerOverlayDemoComponent', () => {
  let component: zhealthcareFileViewerOverlayDemoComponent;
  let fixture: ComponentFixture<zhealthcareFileViewerOverlayDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareFileViewerOverlayDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareFileViewerOverlayDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
