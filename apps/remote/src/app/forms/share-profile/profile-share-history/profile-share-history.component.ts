import { Component, OnInit } from '@angular/core';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';

@Component({
  selector: 'profile-profile-share-history',
  templateUrl: './profile-share-history.component.html'
})
export class ProfileShareHistoryComponent extends FusionFormComponent implements OnInit, FusionFormAdapter {
  notificationDetails: any;

  constructor() {
    super();
   }

  ngOnInit() {
    this.notificationDetails=this.data;
  }
  primaryAction() {}
  secondaryAction() {}
  panelClose() { }

}
