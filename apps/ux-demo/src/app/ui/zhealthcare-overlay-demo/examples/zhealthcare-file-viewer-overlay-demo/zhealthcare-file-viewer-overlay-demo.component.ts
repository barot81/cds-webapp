import { Component, ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { OverlayService } from '@zhealthcare/ux';
import { ComponentType } from '@angular/cdk/portal';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';
import { FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { FileViewerContainerComponent } from '../../file-viewer-container/file-viewer-container.component';

@Component({
  selector: 'zhealthcare-app-zhealthcare-file-viewer-overlay-demo',
  templateUrl: './zhealthcare-file-viewer-overlay-demo.component.html',
  styleUrls: ['./zhealthcare-file-viewer-overlay-demo.component.scss']
})
export class zhealthcareFileViewerOverlayDemoComponent {
  
  fileViewerComponentRef: any;
  documentConfiguration: DocumentViewerConfiguration;

  constructor(private overlayService: OverlayService, private r: ComponentFactoryResolver) {
    this.documentConfiguration = new DocumentViewerConfiguration();
    this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile', 'student');
    this.documentConfiguration.fileCollectionKey = '3f817ef6-74a5-463b-bc64-64d44a966089';
    this.fileViewerComponentRef = this.r.resolveComponentFactory(FileViewerContainerComponent).componentType;
  }

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, this.documentConfiguration);
  }

}
