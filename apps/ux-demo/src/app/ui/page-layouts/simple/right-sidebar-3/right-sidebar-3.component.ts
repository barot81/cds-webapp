import { Component } from '@angular/core';

import { FuseSidebarService } from '@zhealthcare/ux';

@Component({
    selector   : 'simple-right-sidebar-4',
    templateUrl: './right-sidebar-3.component.html',
})
export class SimpleRightSidebar3Component
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
