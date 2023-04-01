import { Component } from "@angular/core";
import { ExxatDrawerFormService } from "../../exxat-drawer-forms-shared.service";

@Component({
    selector: 'ryzen-drawer-with-highlight-menu-container',
    templateUrl: './exxat-drawer-with-highlight-menu-container.component.html',
})

export class ExxatDrawerWithHighlightMenuContainerComponent{

    constructor(public exxatDrawerFormService: ExxatDrawerFormService){    
    }

}
