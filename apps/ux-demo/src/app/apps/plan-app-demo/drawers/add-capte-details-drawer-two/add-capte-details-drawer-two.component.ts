import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecurityContext } from '@exxat/fusion/models';
import { FileCard, FileConfiguration, FileEndpoint } from '@exxat/plugin/file-upload';
import { Fruit } from '../objective-drawer-demo/objective-drawer-demo.component';

@Component({
  selector: 'ryzen-add-capte-details-drawer-two',
  templateUrl: './add-capte-details-drawer-two.component.html',
})
export class AddCAPTEDetailsDrawerTwoComponent implements OnInit {



  optionList = [
    { value: "Option 1", viewValue: "Option 1" },
    { value: "Option 2", viewValue: "Option 2" },
    { value: "Option 3", viewValue: "Option 3" }
  ];

  fileConfiguration: FileConfiguration;
  fileDescriptions: FormControl;
  uxDemoAPPSecurityContext: SecurityContext;
  


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  
  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


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
