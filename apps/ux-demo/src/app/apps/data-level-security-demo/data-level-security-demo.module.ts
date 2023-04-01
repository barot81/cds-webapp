import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataSourceModule } from "@exxat/plugin/data-source";
import { FuseSharedModule, MaterialModule } from "@exxat/ux";
import { DataLevelSecurityDemoContainerComponent } from "./container";
import { DataLevelSecurityDemoRoutingModule } from "./data-level-security-demo-routing.module";
import { AddRuleDrawerComponent, DataLevelSecurityDrawerService } from "./drawers";
import { DataLevelSecurityComponent } from "./pages";

@NgModule({
    declarations: [DataLevelSecurityDemoContainerComponent, DataLevelSecurityComponent, AddRuleDrawerComponent],
    imports: [DataLevelSecurityDemoRoutingModule, FuseSharedModule, MaterialModule, FlexLayoutModule, DataSourceModule, ReactiveFormsModule, FormsModule, DataSourceModule],
    providers: [DataLevelSecurityDrawerService],
    exports: []
})
export class DataLevelSecurityDemoModule {

}