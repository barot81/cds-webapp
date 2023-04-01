import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ryzen-exxat-tooltip',
  templateUrl: './exxat-tooltip.component.html',
  styleUrls: ['./exxat-tooltip.component.scss']
})
export class ExxatTooltipComponent implements OnInit {
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);
  
  @Input() visible: string;
  @Input() text: string;

  constructor() {

  }

  ngOnInit() {

  }
}
