import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule,
} from '@exxat/ux';

import { FuseHighlightModule } from '../../../../helpers/highlight/highlight.module';
import { ExxatFormsComponent } from './exxat-forms.component';
import { ExxatFormsRoutingModule } from './exxat-forms-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { ResponseComponent } from './response/response.component';
import { ProductPlatformInterfaceComponent } from './product-platform-interface/product-platform-interface.component';
import { FormRequestComponent } from './form-request/form-request.component';
import { FormResponseComponent } from './form-response/form-response.component';
import { FormEventComponent } from './form-event/form-event.component';
import { FormsUiComponent } from './forms-ui/forms-ui.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseHighlightModule,
    FuseSharedModule,
    FlexLayoutModule,
    ExxatFormsRoutingModule,
    FuseThemeOptionsModule,
  ],
  exports: [ExxatFormsComponent],
  declarations: [
    ExxatFormsComponent,
    LayoutComponent,
    WorkflowComponent,
    ResponseComponent,
    ProductPlatformInterfaceComponent,
    FormRequestComponent,
    FormResponseComponent,
    FormEventComponent,
    FormsUiComponent,
    NavbarComponent,
  ],
  providers: [],
})
export class ExxatFormsModule {}
