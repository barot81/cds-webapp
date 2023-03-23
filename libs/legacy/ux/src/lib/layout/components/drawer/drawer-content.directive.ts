import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[drawerContentDirective]' })
export class DrawerContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
