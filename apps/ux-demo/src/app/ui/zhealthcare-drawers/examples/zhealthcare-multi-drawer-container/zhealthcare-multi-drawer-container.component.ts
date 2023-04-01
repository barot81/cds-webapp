import { Component } from "@angular/core";
import { zhealthcareDrawerFormService } from "../../zhealthcare-drawer-forms-shared.service";

@Component({
    selector: 'zhealthcare-multi-drawer-container',
    templateUrl: './zhealthcare-multi-drawer-container.component.html'
})
export class zhealthcareMultiDrawerContainerComponent{

    /**
     *
     */
    constructor(public zhealthcareDrawerFormService: zhealthcareDrawerFormService) {
    }

}
