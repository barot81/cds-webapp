
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileCard, FileConfiguration, FileEndpoint } from '@exxat/plugin/file-upload';
import { SecurityContext } from '@exxat/fusion/models';

@Component({
  selector: 'ryzen-edit-institution-details-drawer',
  templateUrl: './edit-institution-details-drawer.component.html',
})
export class EditInstitutionDetailsDrawerComponent implements OnInit {

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

  
  cityList = [
    { value: "City 1", viewValue: "City 1" },
    { value: "City 2", viewValue: "City 2" }
  ]; 

  stateList= [
    { value: "State 1", viewValue: "State 1" },
    { value: "State 2", viewValue: "State 2" }
  ]; 

  countryList= [
    { value: "Country 1", viewValue: "Country 1" },
    { value: "Country 2", viewValue: "Country 2" }
  ];
  
  designationList= [
    { value: "Designation 1", viewValue: "Designation 1" },
    { value: "Designation 2", viewValue: "Designation 2" }
  ];
  
  

  

}


