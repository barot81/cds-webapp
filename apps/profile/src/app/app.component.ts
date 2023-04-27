import { Component } from '@angular/core';
import { routes, roles } from './app.constants';

@Component({
  selector: 'v4-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routes = routes;
  roles = roles;
}
