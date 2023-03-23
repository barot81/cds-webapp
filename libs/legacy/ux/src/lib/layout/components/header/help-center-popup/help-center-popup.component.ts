import { Component, OnInit } from '@angular/core';
import { FusionConfigService } from '@exxat/fusion/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'exxat-help-center-popup',
  templateUrl: './help-center-popup.component.html',
  styleUrls: ['./help-center-popup.component.scss']
})
export class HelpCenterPopupComponent implements OnInit {
  salesForceUrl: string;
  v4SupportUrl: string;
  supportNumber: string;
  constructor(public configService: FusionConfigService, private dialogRef: MatDialogRef<HelpCenterPopupComponent>) {
     this.salesForceUrl = this.configService.getservice('help.center.salesForceUrl').endpoint;
     this.supportNumber = this.configService.getservice('help.center.supportNumber').endpoint;
   }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  // GetChatUrl(){
  //   window.open('https://exxat-systems.secure.force.com/apex/LiveAgentPreChatForm?endpoint=https%3A%2F%2F9lk1.la1-c1-hnd.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Den_US%23deployment_id%3D5727F000000PhEm%26org_id%3D00D7F000004Aw9H%26button_id%3D5737F000000Pb7V%26session_id%3Dd8b71ffc-319f-494f-b5ba-e234c595f31c', '_blank');
  // }
}
