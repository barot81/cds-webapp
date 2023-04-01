import { Component } from "@angular/core";
import { zhealthcareDrawerFormService } from "../../zhealthcare-drawer-forms-shared.service";

@Component({
    selector: 'ryzen-drawer-with-highlight-menu-container',
    templateUrl: './zhealthcare-drawer-with-highlight-menu-container.component.html',
})

export class zhealthcareDrawerWithHighlightMenuContainerComponent{

    constructor(public zhealthcareDrawerFormService: zhealthcareDrawerFormService){
    }

}
