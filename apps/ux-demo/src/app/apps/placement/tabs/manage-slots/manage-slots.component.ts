import { Component, OnInit } from '@angular/core';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

@Component({
  selector: 'ryzen-manage-slots',
  templateUrl: './manage-slots.component.html',
})
export class ManageSlotsComponent implements OnInit {

  constructor(public _uxDemoDrawerService: UXDemoDrawerService) { }

  ngOnInit() {
  }

}
