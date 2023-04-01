
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileCard, FileConfiguration, FileEndpoint } from '@exxat/plugin/file-upload';
import { SecurityContext } from '@exxat/fusion/models';

@Component({
  selector: 'ryzen-add-department-details-drawer',
  templateUrl: './add-department-details-drawer.component.html',
})
export class AddDepartmentDetailsDrawerComponent implements OnInit {

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

  ngOnInit(): void {
  }

  timeZoneList = [
    { value: "Time Zone 1", viewValue: "Time Zone 1" },
    { value: "Time Zone 2", viewValue: "Time Zone 2" }
  ];


}



