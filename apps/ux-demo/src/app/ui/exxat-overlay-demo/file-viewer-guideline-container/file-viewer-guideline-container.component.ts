import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ZhealthcareOverlayRef, HeaderService } from '@zhealthcare/ux';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';

@Component({
  selector: 'ryzen-file-viewer-guideline-container',
  templateUrl: './file-viewer-guideline-container.component.html',
  styleUrls: ['./file-viewer-guideline-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewerGuidelineContainerComponent {

  documentConfiguration: DocumentViewerConfiguration;
  
  constructor(private overlayRef: ZhealthcareOverlayRef, public headerService: HeaderService) {
    this.documentConfiguration = this.overlayRef.data;
  }
  
  ngAfterViewInit() {
    this.headerService.setCurrentHeaderHeight(0);
  }


  cancel() {
    this.overlayRef.close(null);
  }

}
