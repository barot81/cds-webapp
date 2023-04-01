import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { OverlayFormComponent } from '../overlays';

@Injectable({ providedIn: 'any' })
export class OverlayMapService extends ComponentMap {
  /**
   *
   */
  constructor() {
    super();
    this.add('overlay-form', OverlayFormComponent);
  }
}
