/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';
import { OverlayContainerComponent } from '../components';
import { DynamicOverlayRef } from '../types';

@Injectable({ providedIn: 'root' })
export class DynamicOverlayService {
  private _dynamicOverlayRef: DynamicOverlayRef;
  public selector: Type<any>;
  public inputData: any;

  private overlayRef: OverlayRef;

  /**
   *
   */
  constructor(private readonly overlay: Overlay) {
    // this.overlayRef
    //   .backdropClick()
    //   .subscribe(() => this._close('backdropClick', null));
  }

  public open(_selector: Type<any>, data?: any): DynamicOverlayRef {
    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['overlay-modal', 'is-active'],
      backdropClass: 'modal-background',
      disposeOnNavigation: true,
    });

    this.selector = _selector;

    if (data && data !== null) {
      this.inputData = data;
    }

    this.overlayRef = this.overlay.create(config);

    this.overlayRef.attach(new ComponentPortal(OverlayContainerComponent));

    this._dynamicOverlayRef = new DynamicOverlayRef(
      this.overlayRef,
      this.inputData
    );

    return this._dynamicOverlayRef;
  }

  public close(data?: any) {
    this._close('close', data);
  }

  private _close(type: 'backdropClick' | 'close', data: any) {
    this.overlayRef.dispose();

    this._dynamicOverlayRef.afterClosed$.next({
      type,
      data,
    });

    this._dynamicOverlayRef.afterClosed$.complete();
  }
}
