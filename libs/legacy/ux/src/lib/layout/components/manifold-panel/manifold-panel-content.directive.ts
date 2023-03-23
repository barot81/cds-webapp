import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[manifoldPanelContentDirective]' })
export class ManifoldPanelContentDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }
}
