import { Component } from "@angular/core";
import { ExxatDrawerFormService } from "../../exxat-drawer-forms-shared.service";

@Component({
    selector: 'exxat-multi-drawer-container',
    templateUrl: './exxat-multi-drawer-container.component.html'
})
export class ExxatMultiDrawerContainerComponent{

    /**
     *
     */
    constructor(public exxatDrawerFormService: ExxatDrawerFormService) {
    }
    
}