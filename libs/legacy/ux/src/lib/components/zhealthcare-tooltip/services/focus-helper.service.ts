import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'any'})
export class FocusHelper {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  // Shift Focus To "tooltip_focus" Class Element
  shiftFocus() {
    let _tooltip = <HTMLElement>this._document.querySelector('.tippy-box');
    if (_tooltip && _tooltip !== null) {
      _tooltip.focus({ preventScroll: true });
    }
  }
  shiftFocusBack(element: any) {
    if (element && element !== null) {
      element.focus({ preventScroll: true });
    }
  }
}
