import { Component } from "@angular/core";
import { HeaderService } from "@exxat/ux";

@Component({
    selector: 'exxat-academic-info',
    templateUrl: 'academic-info.component.html',
})
export class AcademicInfoComponent {

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService) {
    }
}
