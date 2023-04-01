/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ZhealthcareOverlayRef } from '@zhealthcare/ux';
import { DocumentViewerConfiguration } from '../../models';

@Component({
  selector: 'card-document-viewer',
  templateUrl: './card-document-viewer.component.html'
})
export class CardDocumentViewerComponent implements OnInit {
  documentConfiguration :DocumentViewerConfiguration;
  documentName: string;

  constructor(private overlayRef: ZhealthcareOverlayRef) {

    this.documentConfiguration  = new DocumentViewerConfiguration();
    this.documentConfiguration = this.overlayRef.data.viewerConfiguration;
  }

  cancel() {
    this.overlayRef.close(null);
  }
  ngOnInit() {
  }

}
