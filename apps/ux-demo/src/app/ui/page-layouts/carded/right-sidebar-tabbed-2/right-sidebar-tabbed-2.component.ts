import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';

@Component({
    selector   : 'carded-right-sidebar-tabbed-2',
    templateUrl: './right-sidebar-tabbed-2.component.html',
})
export class CardedRightSidebarTabbed2Component
{
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
