import { AfterViewInit, Component, OnInit } from "@angular/core";
import { HeaderService } from "@exxat/ux";

@Component({
    selector: 'exxat-profiel-admin-container',
    templateUrl: 'profiel-admin-container.component.html',
})
export class ProfileAdminContainerComponent implements AfterViewInit {

    constructor(public readonly _headerService: HeaderService) {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._headerService.setCurrentHeaderHeight(0);
        });
    }

}