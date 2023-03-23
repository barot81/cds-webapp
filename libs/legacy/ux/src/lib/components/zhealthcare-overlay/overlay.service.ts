import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { ZhealthcareOverlayRef } from './zhealthcareoverlay-ref';
import { ZhealthcareOverlayComponent } from './zhealthcare-overlay.component';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {
    constructor(private overlay: Overlay, private injector: Injector) { }

    open<R = any, T = any>(
        content: string | TemplateRef<any> | Type<any>,
        data: T
    ): ZhealthcareOverlayRef<R> {
        const configs = new OverlayConfig({
            hasBackdrop: true,
            panelClass: ['modal', 'is-active'],
            backdropClass: 'modal-background'
        });

        const overlayRef = this.overlay.create(configs);

        const zhealthcareOverlayRef = new ZhealthcareOverlayRef<R, T>(overlayRef, content, data);

        const injector = this.createInjector(zhealthcareOverlayRef, this.injector);
        overlayRef.attach(new ComponentPortal(ZhealthcareOverlayComponent, null, injector));

        return zhealthcareOverlayRef;
    }

    createInjector(ref: ZhealthcareOverlayRef, inj: Injector) {
        const injectorTokens = new WeakMap([[ZhealthcareOverlayRef, ref]]);
        return new PortalInjector(inj, injectorTokens);
    }
}
