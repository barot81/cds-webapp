import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fuseWidgetToggle]'
})
export class FuseWidgetToggleDirective
{
    /**
     * Constructor
     *
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
