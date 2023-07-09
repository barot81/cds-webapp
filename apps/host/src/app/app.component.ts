import { Component } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { navigations } from './nav/navigations';

import { roleConfig, routes } from './routes/app-routes';

@Component({
  selector: 'zhc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  routes = routes;
  roleConfig = roleConfig;
  navigations = navigations;

  constructor(public broadcastService: MsalBroadcastService) {
    console.log('called');
   
  }


}
