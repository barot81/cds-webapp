import { Component, ElementRef, ViewChild } from '@angular/core';
import { FullScreenService, FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'zhealthcare-tab-four',
    templateUrl: 'tab-four.component.html',
})
export class TabFourComponent {

    header_height = new BehaviorSubject<number>(0);
    header_height$ = this.header_height.asObservable();

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService, public _fullScreenService: FullScreenService, private readonly _FuseSidebarService: FuseSidebarService) {
    }

    toggleSidebar(name): void {
        this._FuseSidebarService.getSidebar(name).toggleOpen();
    }
}
