import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { zhealthcareAvatarListItemModule, FuseSharedModule, MaterialModule } from "@zhealthcare/ux";
import { DemoTableComponent } from "./components/demo-table.component";

@NgModule({
    declarations: [DemoTableComponent],
    imports: [CommonModule, FuseSharedModule, MaterialModule, zhealthcareAvatarListItemModule],
    exports: [DemoTableComponent]
})
export class DemoTableModule {

}