import { Injectable } from "@angular/core";
import { ComponentMap } from "@exxat/fusion/core";
import { AddRuleDrawerComponent } from "./add-rule-drawer/add-rule-drawer.component";

@Injectable({providedIn: 'any'})
export class DataLevelSecurityDrawerService extends ComponentMap {

    constructor() {

        super();
        this.add('ryzen-add-rule-drawer', AddRuleDrawerComponent);

    }

}
