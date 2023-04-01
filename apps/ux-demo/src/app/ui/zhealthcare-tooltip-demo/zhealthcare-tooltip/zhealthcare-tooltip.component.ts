import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ryzen-zhealthcare-tooltip',
  templateUrl: './zhealthcare-tooltip.component.html',
  styleUrls: ['./zhealthcare-tooltip.component.scss']
})
export class zhealthcareTooltipComponent implements OnInit {
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);
  
  @Input() visible: string;
  @Input() text: string;

  constructor() {

  }

  ngOnInit() {

  }
}
