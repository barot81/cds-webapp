import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdminLaunchComponent } from './components/admin-launch/admin-launch.component';
import { LaunchComponent } from './components/launch/launch.component';
import { MetaApiClient } from './meta.ApiClient';
import { MetaSandbox } from './meta.sandbox';
import { LookupAPIClientService } from './services/lookup/lookup-APIClient.service';

const routes: Routes = [
  {
    path: 'account/launch',
    component: LaunchComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/account/launch',
    component: AdminLaunchComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    FuseSidebarModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes),
  ],
  exports: [LaunchComponent],
  declarations: [
    LaunchComponent,
    AdminLaunchComponent,
  ],
  providers: [
    MetaApiClient,
    MetaSandbox,
    LookupAPIClientService,
  ],
})
export class MetaModule {}
