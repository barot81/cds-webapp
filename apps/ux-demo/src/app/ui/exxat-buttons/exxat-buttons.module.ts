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
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { MatDividerModule } from '@angular/material/divider';
import { Routes, RouterModule } from '@angular/router';
import { ExxatButtonsComponent } from './exxat-buttons/exxat-buttons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenericButtonsComponent } from './exxat-buttons/tabs/generic-buttons/generic-buttons.component';
import { CustomBadgeComponent } from './exxat-buttons/tabs/custom-badge/custom-badge.component';
import { SpinnerButtonsComponent } from './exxat-buttons/tabs/spinner-buttons/spinner-buttons.component';
import { ExxatShowMoreButtonComponent } from './exxat-buttons/tabs/exxat-show-more-button/exxat-show-more-button.component';
import { ButtonToggleComponent } from './exxat-buttons/tabs/button-toggle/button-toggle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { menuExampleComponent } from './exxat-buttons/tabs/menu-Example/menu-Example.component';
import { NavbarComponent } from './exxat-buttons/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'exxat-buttons',
    component: ExxatButtonsComponent,
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
        component: ExxatShowMoreButtonComponent,
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
    ExxatButtonsComponent,
    ExxatShowMoreButtonComponent,
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
export class UIExxatButtonsModule {}
