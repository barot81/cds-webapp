import { Component } from '@angular/core';
import { ZhealthcareOverlayRef } from '@zhealthcare/ux';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';

@Component({
  selector: 'ryzen-file-viewer-container',
  templateUrl: './file-viewer-container.component.html',
  styleUrls: ['./file-viewer-container.component.scss']
})
export class FileViewerContainerComponent {

  documentConfiguration: DocumentViewerConfiguration;
  
  constructor(private overlayRef: ZhealthcareOverlayRef) {
    this.documentConfiguration = this.overlayRef.data;
  }
  
  cancel() {
    this.overlayRef.close(null);
  }

}
