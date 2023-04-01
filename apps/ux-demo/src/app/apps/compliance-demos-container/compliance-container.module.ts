import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@exxat/ux";
import { ComplinaceDemoContainerRoutingModule } from "./compliance-container-routing.module";
import { ComplianceDemoContainerComponent } from "./compliance-container.component";

@NgModule({
    imports: [CommonModule, ComplinaceDemoContainerRoutingModule, MaterialModule, FlexLayoutModule],
    declarations: [ComplianceDemoContainerComponent]
})
export class ComplianceDemoContainerModule { }