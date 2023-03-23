import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ExxatTooltipModule,
  FuseSearchBarModule,
  FuseShortcutsModule,
  ThemeSelectionModule,
} from '../../../components';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { FuseSharedModule } from '../../../shared.module';
import { ConsentDetailsPopupComponent } from './consent-details-popup/consent-details-popup.component';
import { HeaderDrawerService } from './header-drawer.service';
import { HeaderNotificationDrawerComponent } from './header-notification-drawer/header-notification-drawer.component';
import { HeaderComponent } from './header.component';
import { TechnicalSupportPopupComponent } from './technical-support-popup/technical-support-popup.component';
import { UserSettingDrawerComponent } from './user-setting-drawer/user-setting-drawer.component';
@NgModule({
  declarations: [
    HeaderComponent,
    TechnicalSupportPopupComponent,
    ConsentDetailsPopupComponent,
    HeaderNotificationDrawerComponent,
    UserSettingDrawerComponent,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    FuseSharedModule,
    FuseSearchBarModule,
    ExxatTooltipModule,
    FuseShortcutsModule,
    MatDialogModule,
    FlexLayoutModule,
    CommonModule,
    ThemeSelectionModule,
  ],
  providers: [HeaderDrawerService],
  exports: [HeaderComponent],
})
export class HeaderModule {}
