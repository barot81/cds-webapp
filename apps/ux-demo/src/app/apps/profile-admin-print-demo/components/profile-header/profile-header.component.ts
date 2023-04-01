import { Component } from "@angular/core";
import { FuseSidebarService } from "@zhealthcare/ux";

@Component({
    selector: 'zhealthcare-profile-header',
    templateUrl: 'profile-header.component.html',
})
export class ProfileHeaderComponent {

    /**
     *
     */
    constructor(private readonly _fuseSidebarService: FuseSidebarService) {

    }
    /**
 * Toggle sidebar
 *
 * @param name
 */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


}
