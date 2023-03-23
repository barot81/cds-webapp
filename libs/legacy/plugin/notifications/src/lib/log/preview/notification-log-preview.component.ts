import { Component, OnInit, ViewChild,ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { OverlayService } from '@zhealthcare/ux';
import { ComponentType } from '@angular/cdk/portal';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';
import { FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { FileViewerContainerComponent } from './file-viewer-container/file-viewer-container.component';

@Component({
  selector: 'plugin-notification-log-preview',
  templateUrl: './notification-log-preview.component.html',
})
export class NotificationLogPreviewComponent implements OnInit {

  @ViewChild('content') data: any;

  fileViewerComponentRef: any;
  documentConfiguration: DocumentViewerConfiguration;
  previewContent:any;
  emailSubject:any;
  attachmentsFileDescription:any;

  constructor(private overlayService: OverlayService, private r: ComponentFactoryResolver) {
    this.documentConfiguration = new DocumentViewerConfiguration();
   this.documentConfiguration.fileEndpoint = new FileEndpoint('service.notification','','EssAttachment','FileUpload','FileDescription');
 this.documentConfiguration.isKey=true;
    this.fileViewerComponentRef = this.r.resolveComponentFactory(FileViewerContainerComponent).componentType;
  }

  ngOnInit() {
      this.previewContent=this.data.content;
      this.emailSubject= this.data.subject;
      this.attachmentsFileDescription = this.data.attachmentsFileDescription;
   }

    open(content: TemplateRef<any> | ComponentType<any> | string, collectionKey: string,fileName:string) {
  this.documentConfiguration.fileCollectionKey= collectionKey;
  this.documentConfiguration.defaultFileName = fileName;
  const ref = this.overlayService.open(content, this.documentConfiguration);
  }
}






