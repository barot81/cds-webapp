import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataSourceModule } from "@exxat/plugin/data-source";
import { ExxatAvatarModule, FlexTableModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from "@exxat/ux";
import { DemoCondensedGridComponent } from "./components";

@NgModule({
    declarations: [DemoCondensedGridComponent],
    imports: [CommonModule, FuseSharedModule, FuseSidebarModule, MaterialModule, ExxatAvatarModule, DataSourceModule, FlexTableModule, RouterModule],
    exports: [DemoCondensedGridComponent],
})
export class DemoCondensedGridModule {

}