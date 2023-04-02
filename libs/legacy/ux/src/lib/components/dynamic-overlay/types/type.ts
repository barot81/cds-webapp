/* eslint-disable @typescript-eslint/no-explicit-any */
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export interface DynamicOverlayCloseEvent {
  type: 'backdropClick' | 'close';
  data: any;
}

export class DynamicOverlayRef {
  public afterClosed$ = new Subject<DynamicOverlayCloseEvent>();

  constructor(public overlay: OverlayRef, public inputData: any) {}
}
