import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExxatAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from "@exxat/ux";
import { PROFILEADMINPRINTCOMPONENTS } from "./components";
import { ProfileAdminContainerComponent } from "./container/profiel-admin-container.component";
import { PROFILEADMINPRINTPAGES } from "./pages";
import { ProfileAdminPrintDemoRoutingModule } from "./profile-admin-print-demo-routing.module";

@NgModule(
    {
        declarations: [...PROFILEADMINPRINTPAGES, ...PROFILEADMINPRINTCOMPONENTS, ProfileAdminContainerComponent],
        imports: [
            CommonModule,
            MaterialModule,
            FuseSharedModule,
            FuseSidebarModule,
            ExxatAvatarModule,
            ProfileAdminPrintDemoRoutingModule
        ]
    }
)
export class ProfileAdminPrintDemoModule { }