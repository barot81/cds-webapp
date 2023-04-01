import { Component, ComponentFactoryResolver } from '@angular/core';
import { TooltipInnerComponent } from '../../tooltip-inner/tooltip-inner.component';
@Component({
  selector: 'ryzen-tooltip-example-one',
  templateUrl: './tooltip-example-one.component.html'
})
export class TooltipExampleOneComponent {
  subscribeComponentRef: any;

  tooltipOptions = {
    contentType: 'component',
    placement: 'right',
    trigger: 'click',
    theme: 'light',
    'max-width': '450',
    width: '450',
    'hide-delay': -1,
    pointerEvents: 'auto'
  };

  constructor(private r: ComponentFactoryResolver) {
    this.subscribeComponentRef = this.r.resolveComponentFactory(
      TooltipInnerComponent
    ).componentType;
  }
}
