import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataSourceModule } from "@exxat/plugin/data-source";
import { ExxatAvatarModule, FlexTableModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from "@exxat/ux";
import { DemoFullScrollTableComponent, DemoScrollTableComponent } from "./components";

@NgModule({
    declarations: [DemoFullScrollTableComponent, DemoScrollTableComponent],
    imports: [CommonModule, FuseSharedModule, FuseSidebarModule, MaterialModule, ExxatAvatarModule, DataSourceModule, FlexTableModule, RouterModule],
    exports: [DemoFullScrollTableComponent, DemoScrollTableComponent],
})
export class DemoFullScrollTableModule {

}