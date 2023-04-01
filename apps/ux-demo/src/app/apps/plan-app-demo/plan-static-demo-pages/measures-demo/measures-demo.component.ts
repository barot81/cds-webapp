import { Component, OnInit } from '@angular/core';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';

@Component({
  selector: 'exxat-app-measures-demo',
  templateUrl: './measures-demo.component.html',
  styleUrls: ['./measures-demo.component.scss']
})
export class MeasuresDemoComponent implements OnInit {

  constructor(public _PlanAppDemoDrawerService: PlanAppDemoDrawerService) { }

  ngOnInit() {
  }

}
