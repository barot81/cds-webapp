/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input } from '@angular/core';
import {
  MatMenuTrigger,
  MenuPositionX,
  MenuPositionY
} from '@angular/material/menu';

@Component({
  selector: 'auto-open-menu',
  templateUrl: './auto-open-menu.component.html'
})
export class AutoOpenMenuComponent {
  private _timedOutCloser;

  @Input('hasBackdrop') hasBackdrop: boolean = false;

  @Input('overlapTrigger') overlapTrigger: boolean = false;

  @Input('xPosition') xPosition: MenuPositionX = 'after';

  @Input('yPosition') yPosition: MenuPositionY = 'below';

  constructor() {}

  mouseEnter(menuTrigger: MatMenuTrigger) {
    if (this._timedOutCloser) {
      clearTimeout(this._timedOutCloser);
    }
    menuTrigger.openMenu();
  }

  mouseLeave(menuTrigger: MatMenuTrigger) {
    this._timedOutCloser = setTimeout(() => {
      menuTrigger.closeMenu();
    }, 225);
  }
}
