import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';
import { scan, map, distinctUntilChanged } from 'rxjs/operators'


@Injectable({
    providedIn: 'root',
})
export class SpinnerOverlayService {
    private spinnerTopRef: OverlayRef;

    private spin$: Subject<number> = new Subject()

    constructor(
        private overlay: Overlay,
    ) {

        this.spinnerTopRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'transparent-backdrop',
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        });

        this.spin$
            .asObservable()
            .pipe(
                scan((acc, next) => {
                    if (!next) return 0;
                    return (acc + next) >= 0 ? acc + next : 0;
                }, 0),
                map(val => val > 0),
                distinctUntilChanged()
            )
            .subscribe(
                (res) => {
                    if (res) {
                        this.spinnerTopRef.attach(new ComponentPortal(ProgressSpinnerComponent))
                    }
                    else if (this.spinnerTopRef.hasAttached()) {
                        this.spinnerTopRef.detach();
                    }
                }
            )
    }

    show() {
        this.spin$.next(1);
    }

    hide() {
        this.spin$.next(-1);
    }
    
    reset() {
        this.spin$.next(0);
    }
}
