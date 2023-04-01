import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ESSWizardRoutingModule } from './ess-wizard-routing.module';
import { EssWizardComponent } from './ess-wizard.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EssChipsComponent } from './ess-chips/ess-chips.component';
import { FileUploadModule } from '@exxat/plugin/file-upload';

@NgModule({
  declarations: [EssWizardComponent, EssChipsComponent],
  imports: [
    CommonModule,
    ESSWizardRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    FileUploadModule
  ]
})
export class ESSWizardModule { }
