import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ryzen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);
  constructor() { }

  ngOnInit() {
  }

}
