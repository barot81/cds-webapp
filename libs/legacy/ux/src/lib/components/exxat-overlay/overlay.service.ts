import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { ExxatOverlayRef } from './exxatoverlay-ref';
import { ExxatOverlayComponent } from './exxat-overlay.component';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {
    constructor(private overlay: Overlay, private injector: Injector) { }

    open<R = any, T = any>(
        content: string | TemplateRef<any> | Type<any>,
        data: T
    ): ExxatOverlayRef<R> {
        const configs = new OverlayConfig({
            hasBackdrop: true,
            panelClass: ['modal', 'is-active'],
            backdropClass: 'modal-background'
        });

        const overlayRef = this.overlay.create(configs);

        const exxatOverlayRef = new ExxatOverlayRef<R, T>(overlayRef, content, data);

        const injector = this.createInjector(exxatOverlayRef, this.injector);
        overlayRef.attach(new ComponentPortal(ExxatOverlayComponent, null, injector));

        return exxatOverlayRef;
    }

    createInjector(ref: ExxatOverlayRef, inj: Injector) {
        const injectorTokens = new WeakMap([[ExxatOverlayRef, ref]]);
        return new PortalInjector(inj, injectorTokens);
    }
}
