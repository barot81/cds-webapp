import { Component, OnInit } from '@angular/core';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';
import { FileEndpoint } from '@zhealthcare/plugin/file-upload';

@Component({
  selector: 'ryzen-zhealthcare-file-viewer-tab',
  templateUrl: './zhealthcare-file-viewer-tab.component.html',
  styleUrls: ['./zhealthcare-file-viewer-tab.component.scss']
})
export class zhealthcareFileViewerTabComponent implements OnInit {

  documentConfiguration: DocumentViewerConfiguration;

  constructor() {
    this.documentConfiguration = new DocumentViewerConfiguration();
    this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile', 'student');
    this.documentConfiguration.fileCollectionKey = '3f817ef6-74a5-463b-bc64-64d44a966089';
  }

  ngOnInit() {
  }

}
