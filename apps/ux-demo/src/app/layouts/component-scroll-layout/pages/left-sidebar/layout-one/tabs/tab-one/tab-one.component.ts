import { Component, OnInit } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux';

@Component({
    selector: 'exxat-tab-one',
    templateUrl: 'tab-one.component.html',
})
export class TabOneComponent implements OnInit {


    constructor(public readonly _headerService: HeaderService, private readonly _FuseSidebarService: FuseSidebarService) {

    }

    ngOnInit() {
    }


    toggleSidebar(name): void {
        this._FuseSidebarService.getSidebar(name).toggleOpen();
    }


}
