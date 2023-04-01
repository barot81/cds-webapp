import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { MaterialModule } from '@zhealthcare/ux';

const appRoutes: Routes = [
  {
    path: 'apps',
    loadChildren: () => import('../apps/apps.module').then(mod => mod.AppsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'ui',
    loadChildren: () => import('../ui/ui.module').then(mod => mod.UIModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [],
  providers: []
})
export class UxDemoModule {}
