import { Component } from '@angular/core';

import { FuseSidebarService } from '@zhealthcare/ux';

@Component({
    selector   : 'simple-right-sidebar-4',
    templateUrl: './right-sidebar-4.component.html',
})
export class SimpleRightSidebar4Component
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
