import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExxatOverlayRef, HeaderService } from '@exxat/ux';
import { DocumentViewerConfiguration } from '@exxat/plugin/file-upload';

@Component({
  selector: 'ryzen-file-viewer-overlay-demo3-container',
  templateUrl: './file-viewer-overlay-demo3-container.component.html',
  styleUrls: ['./file-viewer-overlay-demo3-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewerOverlayDemo3ContainerComponent {
  documentConfiguration: DocumentViewerConfiguration;
  
  constructor(private overlayRef: ExxatOverlayRef, public headerService: HeaderService) {
    this.documentConfiguration = this.overlayRef.data;
  }
  
  ngAfterViewInit() {
    this.headerService.setCurrentHeaderHeight(0);
  }


  cancel() {
    this.overlayRef.close(null);
  }

}
