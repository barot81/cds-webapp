import { Component} from '@angular/core';
import { ExxatOverlayRef } from '@exxat/ux';
import { DocumentViewerConfiguration } from '@exxat/plugin/file-upload';

@Component({
  selector: 'plugin-file-viewer-container',
  templateUrl: './file-viewer-container.component.html',
})

export class FileViewerContainerComponent {
  documentConfiguration: DocumentViewerConfiguration;
  constructor(private overlayRef: ExxatOverlayRef) {
    this.documentConfiguration = this.overlayRef.data;
  }
  
  cancel() {
    this.overlayRef.close(null);
  }

}

