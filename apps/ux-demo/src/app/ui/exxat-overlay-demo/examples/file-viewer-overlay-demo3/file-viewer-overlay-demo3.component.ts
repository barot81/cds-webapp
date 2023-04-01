import { Component, ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { OverlayService } from '@zhealthcare/ux';
import { ComponentType } from '@angular/cdk/portal';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';
import { FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { FileViewerOverlayDemo3ContainerComponent } from '../../file-viewer-overlay-demo3-container/file-viewer-overlay-demo3-container.component';

@Component({
  selector: 'ryzen-file-viewer-overlay-demo3',
  templateUrl: './file-viewer-overlay-demo3.component.html',
})
export class FileViewerOverlayDemo3Component {

  fileViewerComponentRef: any;
  documentConfiguration: DocumentViewerConfiguration;

  constructor(private overlayService: OverlayService, private r: ComponentFactoryResolver) {
    this.documentConfiguration = new DocumentViewerConfiguration();
    this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile', 'student');
    this.documentConfiguration.fileCollectionKey = '3f817ef6-74a5-463b-bc64-64d44a966089';
    this.fileViewerComponentRef = this.r.resolveComponentFactory(FileViewerOverlayDemo3ContainerComponent).componentType;
  }

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, this.documentConfiguration);
  }


}
