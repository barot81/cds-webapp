import { Component } from '@angular/core';
import { FuseSidebarService, HeaderService, FullScreenService } from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'zhealthcare-tab-six',
    templateUrl: 'tab-six.component.html',
})
export class TabSixComponent {


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
