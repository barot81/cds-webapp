import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[foundationReferenceArea]',
})

export class ReferenceAreaDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
