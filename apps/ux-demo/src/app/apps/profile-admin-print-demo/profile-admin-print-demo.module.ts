import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { zhealthcareAvatarModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from "@zhealthcare/ux";
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
            zhealthcareAvatarModule,
            ProfileAdminPrintDemoRoutingModule
        ]
    }
)
export class ProfileAdminPrintDemoModule { }