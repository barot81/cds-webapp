import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MaterialModule,
  FuseSharedModule,
  FuseModule,
  zhealthcareBreadcrumbModule,
  FuseThemeOptionsModule,
} from '@zhealthcare/ux';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { VerticalTabsComponent } from './vertical-tabs/vertical-tabs.component';
import { SecondaryNavComponent } from './secondary-nav/secondary-nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';

const routes: Routes = [
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'breadcrumbs',
        pathMatch: 'full',
      },
      {
        path: 'breadcrumbs',
        component: BreadcrumbComponent,
      },
      {
        path: 'vertical-tabs',
        component: VerticalTabsComponent,
      },
      {
        path: 'primary-tabs',
        component: PrimaryNavComponent,
      },
      {
        path: 'sec-nav',
        component: SecondaryNavComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationTabsComponent,
    BreadcrumbComponent,
    VerticalTabsComponent,
    SecondaryNavComponent,
    NavbarComponent,
    PrimaryNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    FuseHighlightModule,
    ReactiveFormsModule,
    FormsModule,
    FuseModule,
    FuseSharedModule,
    FlexModule,
    MaterialModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    zhealthcareBreadcrumbModule,
    FlexLayoutModule,
    FuseThemeOptionsModule,
  ],
})
export class NavigationModule {}
