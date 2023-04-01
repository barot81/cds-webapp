import { Component, OnInit } from '@angular/core';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';

@Component({
  selector: 'ryzen-drawer-examples-demo',
  templateUrl: './drawer-examples-demo.component.html',
})
export class DrawerExamplesDemoComponent implements OnInit {

  constructor( public _UXDemoDrawerService: UXDemoDrawerService) { }

  ngOnInit() {
  }

}
