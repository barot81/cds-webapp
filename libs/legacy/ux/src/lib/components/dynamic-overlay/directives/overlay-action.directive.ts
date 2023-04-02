/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Type,
} from '@angular/core';
import { DynamicOverlayService } from '../services';
import { DynamicOverlayCloseEvent } from '../types';

@Directive({
  selector: '[overlayAction]',
})
export class OverlayActionDirective {
  @Input('selector') selector: Type<any>;
  @Input('data') data: any;

  @Output() onClose = new EventEmitter<DynamicOverlayCloseEvent>();
  /**
   *
   */
  constructor(
    private _el: ElementRef,
    private readonly overlayService: DynamicOverlayService
  ) {}

  @HostListener('click', ['$event.target']) onClick() {
    if (this.selector && this.selector !== null) {
      const ref = this.overlayService.open(this.selector, this.data);
      ref.afterClosed$.subscribe((res) => {
        if (res && res !== null) {
          this.onClose.emit(res);
          if (
            this._el &&
            this._el &&
            this._el?.nativeElement &&
            this._el?.nativeElement !== null
          ) {
            (<HTMLElement>this._el.nativeElement).focus({
              preventScroll: true,
            });
          }
        }
      });
    }
  }
}
