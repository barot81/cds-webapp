/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { DynamicOverlayService } from '../../services';

@Component({
  selector: 'overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
})
export class OverlayContainerComponent implements AfterViewInit {
  _portal: Portal<any>;
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private overlayService: DynamicOverlayService
  ) {}

  ngAfterViewInit(): void {
    if (this._portal && this._portal !== null) {
      this._portal.detach();
    }

    this._portal = new ComponentPortal(this.overlayService.selector);

    this.focusHelper('focus');
  }

  private focusHelper(type: 'focus' | 'blur') {
    const _overlay = <HTMLElement>(
      this._document.querySelector('#overlay-content')
    );
    if (_overlay && _overlay !== null) {
      setTimeout(() => {
        if (type === 'focus') {
          _overlay.focus({ preventScroll: true });
        } else {
          _overlay.blur();
        }
      });
    }
  }
}
