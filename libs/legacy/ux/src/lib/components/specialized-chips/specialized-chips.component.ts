import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'specialized-chip',
  templateUrl: './specialized-chips.component.html',
  styleUrls: ['./specialized-chips.component.scss'],
})
export class SpecializedChipsComponent implements OnInit {
  @Input('name') specializedChip: string;

  tooltipOptions = {
    contentType: 'string',
    placement: 'top',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto',
  };

  constructor() {}

  ngOnInit(): void {}

  isTooltipEnable(elem: string): boolean {
    return elem.length > 16;
  }

  isTextOverflow(elem: string) {
    return elem.length > 16 ? elem.slice(0, 16) + '...' : elem;
  }
}
