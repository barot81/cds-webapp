import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@exxat/ux";
import { SiteDemosContainerRoutingModule } from "./site-demos-container-routing.module";
import { SiteDemosContainerComponent } from "./site-demos-container.component";

@NgModule({
    imports: [CommonModule, SiteDemosContainerRoutingModule, MaterialModule, FlexLayoutModule],
    declarations: [SiteDemosContainerComponent]
})
export class SiteDemosContainerModule { }