import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[manifoldPanelDirective]' })
export class ManifoldPanelDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }
}
