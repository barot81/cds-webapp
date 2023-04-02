import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'any'})
export class SidebarFocusHelper {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  shiftFocus() {
    const element =  <HTMLElement>this._document.querySelector('[role="main"]')
    element.setAttribute('tabindex','-1')
    element.focus();
  }

  shiftFocusWithId(id:any){

    const isAvailable = (<HTMLElement>this._document.querySelector('[role="region"]')) &&  (<HTMLElement>this._document.getElementById(id))

    if(isAvailable !== null){
      const element = isAvailable
      element.setAttribute('tabindex','-1')
      element.focus();
    }
  }
}
