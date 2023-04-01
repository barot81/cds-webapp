import { Component } from '@angular/core';

import { FuseSidebarService } from '@exxat/ux';

@Component({
    selector   : 'simple-left-sidebar-4',
    templateUrl: './left-sidebar-4.component.html',
})
export class SimpleLeftSidebar4Component
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
