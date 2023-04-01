import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { HighLightNavMenuItemComponentLevelComponent } from './high-light-nav-menu-item-component-level/high-light-nav-menu-item-component-level.component';
import { HighLightNavMenuItemPageLevelComponent } from './high-light-nav-menu-item-page-level/high-light-nav-menu-item-page-level.component';

const routes: Routes = [
  // {
  //   path: 'High-Light-Nav-Menu-Item-Page-level-Demo',
  //   component: HighLightNavMenuItemPageLevelComponent
  // },
  {
    path: 'High-Light-Nav-Menu-Item-Component-level-Demo',
    component: HighLightNavMenuItemComponentLevelComponent,
  },
];

@NgModule({
  declarations: [
    HighLightNavMenuItemPageLevelComponent,
    HighLightNavMenuItemComponentLevelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FuseSharedModule,
    FuseSidebarModule,
  ],
})
export class HighLightNavMenuItemModule {}
