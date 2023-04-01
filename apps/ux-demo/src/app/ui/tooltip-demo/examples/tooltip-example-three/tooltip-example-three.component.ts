import { Component } from '@angular/core';
@Component({
  selector: 'ryzen-tooltip-example-three',
  templateUrl: './tooltip-example-three.component.html',
})
export class TooltipExampleThreeComponent {
  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto',
  };
}
