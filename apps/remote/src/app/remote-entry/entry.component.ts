import { Component } from '@angular/core';
import { PageFacade } from '@zhealthcare/ux';

@Component({
  selector: 'remote-entry',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  <!-- <zhealthcare-patients-grid></zhealthcare-patients-grid> -->
  `,
  styles:[`
  :host {
    display: block !important;
    flex: 1 1 100%;
    padding-top: 15px;
  }
  .container {
    padding: 15px !important;
    height: 80% !important;
  }
  `]
})
export class RemoteEntryComponent {

  constructor(private pageFacade: PageFacade) {
    this.pageFacade.setPageTitle('Patients');
  }
}
