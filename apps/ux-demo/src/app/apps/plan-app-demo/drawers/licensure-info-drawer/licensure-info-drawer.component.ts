import { Component, OnInit } from '@angular/core';
import { FileConfiguration, FileEndpoint, FileCard } from '@exxat/plugin/file-upload';
import { FormControl } from '@angular/forms';
import { SecurityContext } from '@exxat/fusion/models';

@Component({
  selector: 'ryzen-licensure-info-drawer',
  templateUrl: './licensure-info-drawer.component.html',
})
export class LicensureInfoDrawerComponent implements OnInit {


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

  ngOnInit() {
  }

}
