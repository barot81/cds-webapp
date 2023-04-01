/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { OverlayMapService } from '../../services';

@Component({
  selector: 'component-passing-example',
  templateUrl: './component-passing-example.component.html',
  styleUrls: ['./component-passing-example.component.scss'],
})
export class ComponentPassingExampleComponent {
  subscribeData = null;

  data = {
    name: 'DEMO User',
    email: 'demouser@gmail.com',
  };

  constructor(public _overlayMap: OverlayMapService) {}

  onClose(event) {
    if (event && event !== null && event?.data && event?.data !== null)
      this.subscribeData = event?.data;
  }
}
