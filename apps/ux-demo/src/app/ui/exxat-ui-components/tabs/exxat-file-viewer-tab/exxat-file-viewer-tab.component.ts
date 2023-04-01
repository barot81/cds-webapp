import { Component, OnInit } from '@angular/core';
import { DocumentViewerConfiguration } from '@exxat/plugin/file-upload';
import { FileEndpoint } from '@exxat/plugin/file-upload';

@Component({
  selector: 'ryzen-exxat-file-viewer-tab',
  templateUrl: './exxat-file-viewer-tab.component.html',
  styleUrls: ['./exxat-file-viewer-tab.component.scss']
})
export class ExxatFileViewerTabComponent implements OnInit {

  documentConfiguration: DocumentViewerConfiguration;

  constructor() {
    this.documentConfiguration = new DocumentViewerConfiguration();
    this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile', 'student');
    this.documentConfiguration.fileCollectionKey = '3f817ef6-74a5-463b-bc64-64d44a966089';
  }

  ngOnInit() {
  }

}
