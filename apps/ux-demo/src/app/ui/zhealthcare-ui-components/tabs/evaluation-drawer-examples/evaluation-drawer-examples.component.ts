import { Component, OnInit } from '@angular/core';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';


@Component({
  selector: 'ryzen-evaluation-drawer-examples',
  templateUrl: './evaluation-drawer-examples.component.html',
})
export class EvaluationDrawerExamplesComponent implements OnInit {

  constructor(public _UXDemoDrawerService: UXDemoDrawerService) { }

  ngOnInit() {
  }

}
