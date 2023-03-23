import { Component} from '@angular/core';
import { zhealthcareOverlayRef } from '@zhealthcare/ux';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';

@Component({
  selector: 'plugin-file-viewer-container',
  templateUrl: './file-viewer-container.component.html',
})

export class FileViewerContainerComponent {
  documentConfiguration: DocumentViewerConfiguration;
  constructor(private overlayRef: zhealthcareOverlayRef) {
    this.documentConfiguration = this.overlayRef.data;
  }

  cancel() {
    this.overlayRef.close(null);
  }

}

