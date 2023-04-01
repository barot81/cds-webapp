import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@zhealthcare/ux";
import { PlanDemosContainerRoutingModule } from "./plan-demos-container-routing.module";
import { PlanDemosContainerComponent } from "./plan-demos-container.component";

@NgModule({
    imports: [CommonModule, PlanDemosContainerRoutingModule, MaterialModule, FlexLayoutModule],
    declarations: [PlanDemosContainerComponent]
})
export class PlanDemosContainerModule { }