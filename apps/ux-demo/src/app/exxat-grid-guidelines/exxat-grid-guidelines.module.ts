import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@exxat/ux";
import { ExxatGrdiGuidelinesContainerComponent } from "./container/exxat-grid-guidelines-container.component";
import { ExxatGridGuidelinesRoutingModule } from "./exxat-grid-guidelines-routing.module";

@NgModule({
    declarations: [ExxatGrdiGuidelinesContainerComponent],
    imports: [CommonModule, ExxatGridGuidelinesRoutingModule, MaterialModule, FlexLayoutModule, FormsModule,
        ReactiveFormsModule]
})
export class ExxatGridGuidelinesModule { }