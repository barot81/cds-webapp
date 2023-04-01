import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExxatAvatarListItemModule, FuseSharedModule, MaterialModule } from "@exxat/ux";
import { DemoTableComponent } from "./components/demo-table.component";

@NgModule({
    declarations: [DemoTableComponent],
    imports: [CommonModule, FuseSharedModule, MaterialModule, ExxatAvatarListItemModule],
    exports: [DemoTableComponent]
})
export class DemoTableModule {

}