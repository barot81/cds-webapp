import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationItem, NavigationItemClasses} from '@zhealthcare/fusion/models';
import { FusionNavigationService } from '@zhealthcare/fusion/services';

@Component({
    selector: 'fusion-nav-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class FusionNavGroupComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    classes = 'nav-group nav-item';

    itemClasses = new NavigationItemClasses();

    @Input()
    item: NavigationItem;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */

    /**
     *
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FusionNavigationService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        if (this.item && this.item != null && this.item.classes && this.item.classes != null) {
            this.itemClasses = JSON.parse(this.item.classes);
        }

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

}
