import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuseSharedModule } from '../../../shared.module';

import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';
import { DrawerContentDirective } from './drawer-content.directive';
import { FuseDirectivesModule } from '../../../directives';
import { FuseProgressBarModule } from '../../../components/progress-bar/progress-bar.module';
import { FuseConfirmDialogModule } from '../../../components/confirm-dialog/confirm-dialog.module';
import { MaterialModule } from '../../../material.module';
import { RoleBasedAccessService } from '@exxat/fusion/services';
import { A11yModule } from '@angular/cdk/a11y';
import { UXStoreModule } from '../../../store/store.module';
import { ExxatTooltipModule } from '../../../components/exxat-tooltip/modules/tooltip.module';

@NgModule({
  declarations: [
    DrawerComponent,
    DrawerContentDirective
  ],
  providers: [
    DrawerService,
    RoleBasedAccessService
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FuseDirectivesModule,
    FuseProgressBarModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    UXStoreModule,
    A11yModule,
    ExxatTooltipModule
  ],
  exports: [
    DrawerComponent
  ],
})
export class DrawerModule {
}
