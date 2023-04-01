import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataSourceModule } from "@zhealthcare/plugin/data-source";
import { zhealthcareAvatarModule, FlexTableModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from "@zhealthcare/ux";
import { DemoCondensedGridComponent } from "./components";

@NgModule({
    declarations: [DemoCondensedGridComponent],
    imports: [CommonModule, FuseSharedModule, FuseSidebarModule, MaterialModule, zhealthcareAvatarModule, DataSourceModule, FlexTableModule, RouterModule],
    exports: [DemoCondensedGridComponent],
})
export class DemoCondensedGridModule {

}