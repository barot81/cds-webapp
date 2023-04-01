import { Component } from "@angular/core";
import { HeaderService } from "@zhealthcare/ux";

@Component({
    selector: 'zhealthcare-academic-info',
    templateUrl: 'academic-info.component.html',
})
export class AcademicInfoComponent {

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService) {
    }
}
