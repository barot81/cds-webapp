import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
  FuseSharedModule,
  MaterialModule,
  FuseProgressBarModule,
  FuseModule,
  FuseSidebarModule,
  LayoutModule,
  FuseDirectivesModule,
  FuseThemeOptionsModule,
  ExxatAvatarListItemModule
} from '@exxat/ux';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarLayoutPopupSixComponent } from './examples/popups/layout-popup-six/layout-popup-six.component';
import { SidebarLayoutPopupFiveComponent } from './examples/popups/layout-popup-five/layout-popup-five.component';
import { SidebarLayoutPopupFourComponent } from './examples/popups/layout-popup-four/layout-popup-four.component';
import { SidebarLayoutPopupThreeComponent } from './examples/popups/layout-popup-three/layout-popup-three.component';
import { SidebarLayoutPopupTwoComponent } from './examples/popups/layout-popup-two/layout-popup-two.component';
import { SidebarLayoutPopupOneComponent } from './examples/popups/layout-popup-one/layout-popup-one.component';
import { SidebarSixComponent } from './examples/sidebar-six/sidebar-six.component';
import { SidebarFiveComponent } from './examples/sidebar-five/sidebar-five.component';
import { SidebarFourComponent } from './examples/sidebar-four/sidebar-four.component';
import { SidebarContainerComponent } from './container/container.component';
import { SidebarOneComponent } from './examples/sidebar-one/sidebar-one.component';
import { SidebarTwoComponent } from './examples/sidebar-two/sidebar-two.component';
import { SidebarThreeComponent } from './examples/sidebar-three/sidebar-three.component';
import { SidebarFocusHelper } from './exxat-sidebar.service';

const routes: Routes = [
  {
    path: 'exxat-sidebar',
    component: SidebarContainerComponent,
  },
  {
    path: 'exxat-sidebar/sidebar-one',
    component: SidebarOneComponent,
  },
  {
    path: 'exxat-sidebar/sidebar-two',
    component: SidebarTwoComponent,
  },
  {
    path: 'exxat-sidebar/sidebar-three',
    component: SidebarThreeComponent,
  },
  {
    path: 'exxat-sidebar/sidebar-four',
    component: SidebarFourComponent,
  },
  {
    path: 'exxat-sidebar/sidebar-five',
    component: SidebarFiveComponent,
  },
  {
    path: 'exxat-sidebar/sidebar-six',
    component: SidebarSixComponent,
  }
  
];

@NgModule({
  declarations: [
    SidebarContainerComponent,
    SidebarOneComponent,
    SidebarTwoComponent,
    SidebarThreeComponent,
    SidebarFourComponent,
    SidebarFiveComponent,
    SidebarSixComponent,
    SidebarLayoutPopupOneComponent,
    SidebarLayoutPopupTwoComponent,
    SidebarLayoutPopupThreeComponent,
    SidebarLayoutPopupFourComponent,
    SidebarLayoutPopupFiveComponent,
    SidebarLayoutPopupSixComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    FuseSharedModule,
    FuseHighlightModule,
    MaterialModule,
    FuseProgressBarModule,
    FuseSharedModule,
    FuseModule,
    FuseSidebarModule,
    MatDividerModule,
    LayoutModule,
    FuseDirectivesModule,
    MatDialogModule,
    FuseThemeOptionsModule,
    ExxatAvatarListItemModule
  ],
  providers: [SidebarFocusHelper],
})
export class ExxatSidebarModule {}
