import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class FuseMatSidenavHelperService
{
    sidenavInstances: MatSidenav[];

    /**
     * Constructor
     */
    constructor()
    {
        this.sidenavInstances = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set sidenav
     *
     */
    setSidenav(id, instance): void
    {
        this.sidenavInstances[id] = instance;
    }


    getSidenav(id): any
    {
        return this.sidenavInstances[id];
    }
}
