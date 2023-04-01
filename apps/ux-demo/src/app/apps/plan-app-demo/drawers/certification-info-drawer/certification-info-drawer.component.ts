import { Component, OnInit } from '@angular/core';
import { FileConfiguration, FileEndpoint, FileCard } from '@zhealthcare/plugin/file-upload';
import { FormControl } from '@angular/forms';
import { SecurityContext } from '@zhealthcare/fusion/models';

@Component({
  selector: 'ryzen-certification-info-drawer',
  templateUrl: './certification-info-drawer.component.html',
})
export class CertificationInfoDrawerComponent implements OnInit {

  fileConfiguration: FileConfiguration;
  fileDescriptions: FormControl;
  uxDemoAPPSecurityContext: SecurityContext;
  
  constructor() { 
      // File Upload Configuration  -- START
      this.fileConfiguration = new FileConfiguration();
      this.fileConfiguration.fileEndpoint = new FileEndpoint('zhealthcare.ux', 'Demo');
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
