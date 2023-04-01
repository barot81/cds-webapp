import { Component, OnInit } from '@angular/core';
import { NotificationService } from './../services/navigation.service';
import { ManifoldPanelService } from '@exxat/ux';
import { EmailConfiguration } from '@exxat/plugin/notifications';
@Component({
  selector: 'exxat-wizard',
  templateUrl: './navigation-wizard.component.html',
  styleUrls: ['./navigtion-wizard.component.scss']
})

export class WizardComponent implements OnInit {

  emailConfiguration:EmailConfiguration;
  constructor(public notificationService:NotificationService,private draverservice:ManifoldPanelService) {
    this.emailConfiguration  = new EmailConfiguration();
    this.emailConfiguration.from="from@gmail.com";
    this.emailConfiguration.replyto="reply@gmail.com";
    this.emailConfiguration.showEmailSendTypeInput=true;
     this.emailConfiguration.labelGroupTypeInput="group";
    this.emailConfiguration.labelSeparateTypeInput="sepearte";
    this.emailConfiguration.showDescriptionInput=true;
    this.emailConfiguration.showEmailSendTypeInput=true;
    this.emailConfiguration.showScheduleType=true;
    this.emailConfiguration.showUploadFileInput=true;
    this.emailConfiguration.recipientCount=7;
    this.emailConfiguration.recipientType="student";
   // this.emailConfiguration.

  }

  ngOnInit() { }

  checkStep(event){
    if(event=='3')
    {
    //  DrawerActions.CloseDrawerWithSnackBarMessage({ payload: 'Record Updated Successfully.' })
    this.draverservice.closeAllManifoldPanels();
    }
  }
}
