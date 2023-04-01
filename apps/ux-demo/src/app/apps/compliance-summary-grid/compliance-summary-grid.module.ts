import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ExxatAvatarModule, MaterialModule } from "@exxat/ux";
import { ComplianceSummaryGridRoutingModule } from "./compliance-summary-grid-routing.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ComplianceSummaryGridComponent } from "./page/compliance-summary-grid.component";

@NgModule({
    declarations: [ComplianceSummaryGridComponent,NavBarComponent],
    imports: [CommonModule, ComplianceSummaryGridRoutingModule, MaterialModule, FlexLayoutModule, ExxatAvatarModule]
})
export class ComplianceSummaryGridModule { }