import { Component, ChangeDetectionStrategy } from '@angular/core';
import { zhealthcareOverlayRef, HeaderService } from '@zhealthcare/ux';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';

@Component({
  selector: 'ryzen-file-viewer-overlay-demo3-container',
  templateUrl: './file-viewer-overlay-demo3-container.component.html',
  styleUrls: ['./file-viewer-overlay-demo3-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewerOverlayDemo3ContainerComponent {
  documentConfiguration: DocumentViewerConfiguration;
  
  constructor(private overlayRef: zhealthcareOverlayRef, public headerService: HeaderService) {
    this.documentConfiguration = this.overlayRef.data;
  }
  
  ngAfterViewInit() {
    this.headerService.setCurrentHeaderHeight(0);
  }


  cancel() {
    this.overlayRef.close(null);
  }

}
