import { Component } from '@angular/core';
import { PageFacade } from '@zhealthcare/ux';

@Component({
  selector: 'remote-entry',
  template: `
  <div class="page-layout  profile-admin carded fullwidth inner-scroll">
    <div class="content" >
        <router-outlet></router-outlet>
  </div>
</div>
  <!-- <zhealthcare-patients-grid></zhealthcare-patients-grid> -->
  `,
  styles:[`
/*
  .container {
    padding: 15px !important;
    height: 100% !important;
  } */
  `]
})
export class RemoteEntryComponent {

  constructor(private pageFacade: PageFacade) {
    this.pageFacade.setPageTitle('Patients');
  }
}
