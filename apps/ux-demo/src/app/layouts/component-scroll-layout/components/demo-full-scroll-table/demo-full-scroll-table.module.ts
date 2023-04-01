import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataSourceModule } from "@zhealthcare/plugin/data-source";
import { zhealthcareAvatarModule, FlexTableModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from "@zhealthcare/ux";
import { DemoFullScrollTableComponent, DemoScrollTableComponent } from "./components";

@NgModule({
    declarations: [DemoFullScrollTableComponent, DemoScrollTableComponent],
    imports: [CommonModule, FuseSharedModule, FuseSidebarModule, MaterialModule, zhealthcareAvatarModule, DataSourceModule, FlexTableModule, RouterModule],
    exports: [DemoFullScrollTableComponent, DemoScrollTableComponent],
})
export class DemoFullScrollTableModule {

}