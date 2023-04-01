import { Component } from '@angular/core';

import { roleConfig, routes } from './routes/app-routes';

@Component({
  selector: 'host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  routes = routes;
  roleConfig = roleConfig;
}
