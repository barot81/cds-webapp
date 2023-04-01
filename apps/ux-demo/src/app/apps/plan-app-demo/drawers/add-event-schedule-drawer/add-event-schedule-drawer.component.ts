import { Component, OnInit } from '@angular/core';
import { FileConfiguration, FileEndpoint, FileCard } from '@exxat/plugin/file-upload';
import { SecurityContext } from '@exxat/fusion/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ryzen-add-event-schedule-drawer',
  templateUrl: './add-event-schedule-drawer.component.html'
})
export class AddEventScheduleDrawerComponent implements OnInit {

  fileConfiguration: FileConfiguration;
  fileDescriptions: FormControl;
  uxDemoAPPSecurityContext: SecurityContext;


  genderList = [
    { value: "male", viewValue: "Male" },
    { value: "female", viewValue: "Female" },
    { value: "others", viewValue: "Others" }
  ];

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
