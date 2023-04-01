import { Component, ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { OverlayService } from '@exxat/ux';
import { ComponentType } from '@angular/cdk/portal';
import { DocumentViewerConfiguration } from '@exxat/plugin/file-upload';
import { FileEndpoint } from '@exxat/plugin/file-upload';
import { FileViewerGuidelineContainerComponent } from '../../file-viewer-guideline-container/file-viewer-guideline-container.component';

@Component({
  selector: 'ryzen-exxat-file-viewer-guideline-overlay-demo',
  templateUrl: './exxat-file-viewer-guideline-overlay-demo.component.html',
  styleUrls: ['./exxat-file-viewer-guideline-overlay-demo.component.scss']
})
export class ExxatFileViewerGuidelineOverlayDemoComponent {

  
  fileViewerComponentRef: any;
  documentConfiguration: DocumentViewerConfiguration;

  constructor(private overlayService: OverlayService, private r: ComponentFactoryResolver) {
    this.documentConfiguration = new DocumentViewerConfiguration();
    this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile', 'student');
    this.documentConfiguration.fileCollectionKey = '3f817ef6-74a5-463b-bc64-64d44a966089';
    this.fileViewerComponentRef = this.r.resolveComponentFactory(FileViewerGuidelineContainerComponent).componentType;
  }

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, this.documentConfiguration);
  }

}
