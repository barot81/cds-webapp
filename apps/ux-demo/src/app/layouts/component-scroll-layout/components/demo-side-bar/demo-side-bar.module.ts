import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from "@exxat/ux";
import { DemoSidebarComponent } from "./components";

@NgModule({
    declarations: [DemoSidebarComponent],
    imports: [CommonModule, FuseSharedModule, FuseSidebarModule, MaterialModule],
    exports: [DemoSidebarComponent]
})
export class DemoSidebarModule {

}