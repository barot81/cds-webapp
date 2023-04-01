import { Component } from "@angular/core";
import { FuseSidebarService } from "@exxat/ux";

@Component({
    selector: 'exxat-profile-header',
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
