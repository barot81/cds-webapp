import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSidebarModule, FuseThemeOptionsModule } from '../../../components';
import { FuseSharedModule } from '../../../shared.module';

import { DrawerModule } from '../../components/drawer/drawer.module';
import { ContentModule } from '../../components/content/content.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { TabNavBarModule } from '../../../components/tabnavbar/tabnavbar.module';
import { ManifoldPanelModule } from '../../components/manifold-panel/manifold-panel.module';
import { QuickPanelModule } from '../../components/quick-panel/quick-panel.module';
import { HeaderModule } from '../../components/header/header.module';
import { zhealthcareAvatarModule } from '../../../components/zhealthcare-avatar/zhealthcare-avatar.module';

import { VerticalLayout1Component } from './layout-1.component';
import { FuseDirectivesModule } from '../../../directives';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [VerticalLayout1Component],
  imports: [
    RouterModule,
    zhealthcareAvatarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseDirectivesModule,
    DrawerModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    QuickPanelModule,
    ManifoldPanelModule,
    HeaderModule,
    TabNavBarModule,
    FuseThemeOptionsModule,
    ScrollingModule,
    A11yModule,
  ],
  exports: [VerticalLayout1Component, DrawerModule, TabNavBarModule],
})
export class VerticalLayout1Module {}
