import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FuseSharedModule,
  MaterialModule,
  FuseModule,
  FuseSidebarModule,
  FuseProgressBarModule,
  FlexTableModule,
  FuseThemeOptionsModule,
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { MatDividerModule } from '@angular/material/divider';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareButtonsComponent } from './zhealthcare-buttons/zhealthcare-buttons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenericButtonsComponent } from './zhealthcare-buttons/tabs/generic-buttons/generic-buttons.component';
import { CustomBadgeComponent } from './zhealthcare-buttons/tabs/custom-badge/custom-badge.component';
import { SpinnerButtonsComponent } from './zhealthcare-buttons/tabs/spinner-buttons/spinner-buttons.component';
import { zhealthcareShowMoreButtonComponent } from './zhealthcare-buttons/tabs/zhealthcare-show-more-button/zhealthcare-show-more-button.component';
import { ButtonToggleComponent } from './zhealthcare-buttons/tabs/button-toggle/button-toggle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { menuExampleComponent } from './zhealthcare-buttons/tabs/menu-Example/menu-Example.component';
import { NavbarComponent } from './zhealthcare-buttons/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'zhealthcare-buttons',
    component: zhealthcareButtonsComponent,
    children: [
      {
        path: '',
        redirectTo: 'button-toggle',
        pathMatch: 'full',
      },
      {
        path: 'button-toggle',
        component: ButtonToggleComponent,
      },
      {
        path: 'show-more',
        component: zhealthcareShowMoreButtonComponent,
      },
      {
        path: 'generic-buttons',
        component: GenericButtonsComponent,
      },
      {
        path: 'status-badges',
        component: CustomBadgeComponent,
      },
      {
        path: 'spinner-buttons',
        component: SpinnerButtonsComponent,
      },
      {
        path: 'menu-buttons',
        component: menuExampleComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    zhealthcareButtonsComponent,
    zhealthcareShowMoreButtonComponent,
    GenericButtonsComponent,
    CustomBadgeComponent,
    SpinnerButtonsComponent,
    ButtonToggleComponent,
    menuExampleComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    FlexTableModule,
    FuseSharedModule,
    FuseHighlightModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FuseProgressBarModule,
    FuseSharedModule,
    FuseModule,
    FuseSidebarModule,
    MatDividerModule,
    FlexLayoutModule,
    FuseThemeOptionsModule,
  ],
  providers: [],
})
export class UIzhealthcareButtonsModule {}
