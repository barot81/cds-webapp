import { Component, OnInit } from '@angular/core';
import { FileConfiguration, FileEndpoint, FileCard } from '@exxat/plugin/file-upload';
import { SecurityContext } from '@exxat/fusion/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-add-resources-drawer',
  templateUrl: './add-resources-drawer.component.html',
})
export class AddResourcesDrawerComponent implements OnInit {
  fileConfiguration: FileConfiguration;
  fileDescriptions: FormControl;
  uxDemoAPPSecurityContext: SecurityContext;

  constructor() { 
    // File Upload Configuration  -- START
    this.fileConfiguration = new FileConfiguration();
    this.fileConfiguration.fileEndpoint = new FileEndpoint('exxat.ux', 'Demo');
    this.fileConfiguration.fileCards = [];
    const fileCard = new FileCard();
    this.fileConfiguration.fileCards.push(fileCard);
    this.fileConfiguration.securityContext = this.uxDemoAPPSecurityContext;
    fileCard.filePath = 'UX Demo';
    // File Upload Configuration  -- END
  }

  documentList = [
    { value: "Document 1", viewValue: "Document 1" },
    { value: "Document 2", viewValue: "Document 2" },
    { value: "Document 3", viewValue: "Document 3" }
  ];

  ngOnInit() {
  }

}
