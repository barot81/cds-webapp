
import { Component, OnInit } from '@angular/core';
import { FileConfiguration, FileEndpoint, FileCard } from '@exxat/plugin/file-upload';
import { FormControl } from '@angular/forms';
import { SecurityContext } from '@exxat/fusion/models';


export interface Fruit {
  name: string;
}

@Component({
  selector: 'exxat-app-objective-drawer-demo',
  templateUrl: './objective-drawer-demo.component.html',
})
export class ObjectiveDrawerDemoComponent implements OnInit {


  optionList = [
    { value: "Option 1", viewValue: "Option 1" },
    { value: "Option 2", viewValue: "Option 2" },
    { value: "Option 3", viewValue: "Option 3" }
  ];

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

